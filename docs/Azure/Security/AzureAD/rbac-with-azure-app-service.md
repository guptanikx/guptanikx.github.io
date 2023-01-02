---
title: "RBAC with Azure App Service"
date: "2021-03-11"
categories: 
  - "azuread"
tags: 
  - "security"
---

- Register a New Application in Azure Active Directory
- Modify Manifest for the Registered Application
- Update `appRoles` in the manifest. `For each role you require a unique Guid`
- Create new Guid and Edit manifest for the application `New-Guid`
```json
{
	"appRoles": [{
		"allowedMemberTypes": ["User"],
		"description": "User readers can read basic profiles of all users in the directory ",
		"displayName": "UserReaders",
		"id": "a816142a-2e8e-46c4-9997-f984faccb625",
		"isEnabled": true,
		"lang": null,
		"origin": "Application",
		"value": "UserReaders"
	}, {
		"allowedMemberTypes": ["User"],
		"description": "Directory viewers can view objects in the whole directory.",
		"displayName": "DirectoryViewers",
		"id": "72ff9f52-8011-49e0-a4f4-cc1bb26206fa",
		"isEnabled": true,
		"lang": null,
		"origin": "Application",
		"value": "DirectoryViewers"
	}]
}
```
- Create new Client Secret under `Certificates and Secrets`
    - Copy the generated secret value. you will not be able to copy afterwards
- [Link - Create WebApplication](consume-azure-ad-identity-in-aspnetcore/)
- Modify `appsettings.json` from above
  ```json
  {
    "AzureAd": {
      "Instance": "https://login.microsoftonline.com/",
      "Domain": "",
      "TenantId": "",
      "ClientId": "",
      "CallbackPath": "/signin-oidc",
      "SignedOutCallbackPath ": "/signout-callback-oidc",
      "ClientSecret": "[Copy the client secret added to the app from the Azure portal]"
      }
  }
  ```
  - Parameters
    - Domain -Â Name of Tenant Domain
    - TenantId - TenantId for the domain
    - ClientId -Â ClientId from the App Registered Above
    - ClientSecret -Â Client secret copied from Step 4

- Add Redirect and Signout URI's to the Registered Application
  - Change port as per your application settings
- Create Options class to pull `GraphAPI` url from config
  ```csharp
  public class GraphOptions     {         public string GraphApiUrl { get; set; }     }
  ```
- Create Constants for custom Authorization Policies
  ```csharp
  public static class AppRole     
  {         
    /// <summary>         
    /// User readers can read basic profiles of all users in the directory.         
    /// </summary>         
    public const string UserReaders = "UserReaders";         
    /// <summary>         
    /// Directory viewers can view objects in the whole directory.         
    /// </summary>         
    public const string DirectoryViewers = "DirectoryViewers";     
  }
  
  public static class AuthorizationPolicies     
  {         
    public const string AssignmentToUserReaderRoleRequired =  "AssignmentToUserReaderRoleRequired";
    public const string AssignmentToDirectoryViewerRoleRequired = "AssignmentToDirectoryViewerRoleRequired";
  }
  ```
- Configure OAuth Middleware in `ConfigureServices` method
  ```csharp
  // Sign-in users with the Microsoft identity platform     
  services.AddMicrosoftIdentityWebAppAuthentication(Configuration)         
          .EnableTokenAcquisitionToCallDownstreamApi(
              new string[] { Constants.ScopeUserRead })
          .AddInMemoryTokenCaches();
  // Add Graph     
  services.Configure<GraphOptions>(Configuration);     
  // The following lines code instruct the asp.net core middleware to use the data in the "roles" claim in the Authorize attribute and User.IsInrole()     
  // See https://docs.microsoft.com/aspnet/core/security/authorization/roles?view=aspnetcore-2.2 for more info.     
  services.Configure<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme, options =>     
  {         
    // The claim in the Jwt token where App roles are available.         
    options.TokenValidationParameters.RoleClaimType = "roles";     
  });     
  // Adding authorization policies that enforce authorization using Azure AD roles.     
  services.AddAuthorization(options =>     
  {         
    options.AddPolicy(AuthorizationPolicies.AssignmentToUserReaderRoleRequired, policy => policy.RequireRole(AppRole.UserReaders)); 
    options.AddPolicy(AuthorizationPolicies.AssignmentToDirectoryViewerRoleRequired, policy => policy.RequireRole(AppRole.DirectoryViewers));     
  });     
  services.AddControllersWithViews(options =>     
  {         
    var policy = new AuthorizationPolicyBuilder()
          .RequireAuthenticatedUser()
          .Build();         
    options.Filters.Add(new AuthorizeFilter(policy));
  }).AddMicrosoftIdentityUI();    
  services.AddRazorPages();
  ```
- Configure OAuth Middleware in `Configure` method
```csharp
app.UseAuthentication();
app.UseEndpoints(endpoints =>     
{         
  endpoints.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
  endpoints.MapRazorPages();     
});
```
- Enable `ID Token` in AppRegistration
- Start the Application and consent screen will open up for first time login
- Register Custom Authentication Provider for our Roles using Graph API
```csharp
public class GraphServiceClientFactory     
{         
  public static GraphServiceClient GetAuthenticatedGraphClient(Func<Task<string>> acquireAccessToken, string baseUrl = null)         
  {
    return new GraphServiceClient(baseUrl, new CustomAuthenticationProvider(acquireAccessToken));         
  }     
}     
public class CustomAuthenticationProvider : IAuthenticationProvider    
{         
  public CustomAuthenticationProvider(Func<Task<string>> acquireTokenCallback)        
  {             
    acquireAccessToken = acquireTokenCallback;         
  }
  private Func<Task<string>> acquireAccessToken;
  public async Task AuthenticateRequestAsync(HttpRequestMessage request)
  {             
    string accessToken = await acquireAccessToken.Invoke();
    // Append the access token to the request.
    request.Headers.Authorization = new AuthenticationHeaderValue(Infrastructure.Constants.BearerAuthorizationScheme, accessToken);
  }     
}
```
- Modify `HomeController` to enable Authorization as per our Roles
  - Inject `ITokenAcquisition` and `IOptions<GraphOptions>` in HomeController
  - Create new `Profile` method which checks if User under `User.Read` role
  ```csharp
  [AuthorizeForScopes(Scopes = new[] { Constants.ScopeUserRead })]
  public async Task<IActionResult> Profile() {
    // Initialize the GraphServiceClient.         
    GraphServiceClient graphClient = GraphServiceClientFactory.GetAuthenticatedGraphClient(async () =>        
    {             
        // Get AccessToken for the Current Logged in User for "User.Read" role 
        string result = await _tokenAcquisition.GetAccessTokenForUserAsync(new[] { Constants.ScopeUserRead });
        return result; 
    }, _webOptionValue.Value.GraphApiUrl);
    var me = await graphClient.Me.Request().GetAsync();         
    ViewData["Me"] = me;      
    }
  ```
- Create a new View named `Profile` and display profile from ViewData

### Issues
- If you are facing below issue you might have skipped Step 12.
