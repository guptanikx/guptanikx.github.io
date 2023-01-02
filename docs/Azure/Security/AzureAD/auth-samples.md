---
title: AzureAD v2 Samples
---

- [For Creating App Registration](create-app-reg){: .blank }
- [Source Code](https://github.com/guptanikx/deploy-apps/tree/main/dotnet/Labs.AdAuthWebApp){: .blank}
- # OpenIdConnect with WebApp
  - [Configuration](https://github.com/guptanikx/azure-hack/blob/main/dotnet/ad/Labs.ActiveDirectoryAuth/OpenIdConnectConfiguration.cs){: .blank}
  - See Program.cs In Source Code
  - Browse `/` and login with user in AzureAD account as per selected Tenant Type
  <hr>
- # Call Graph API OnBehalf of LoggedIn User (Delegated Permissions)
  - [Configuration](https://github.com/guptanikx/azure-hack/blob/main/dotnet/ad/Labs.ActiveDirectoryAuth/OpenIdConnectWithDownstreamConfiguration.cs){: .blank }
  - Browse `/GraphClientDemo` url
    - [Using GraphClientService](https://github.com/guptanikx/azure-hack/blob/main/dotnet/ad/Labs.ActiveDirectoryAuth/GraphClient/GraphClientDemoController.cs){: .blank}
    - [Reference](https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2/tree/master/2-WebApp-graph-user/2-1-Call-MSGraph){: .blank}
  <hr>
- # Call Storage or other API's on behalf-of LoggedIn (Delegated Permissions)
  - [Configuration](https://github.com/guptanikx/azure-hack/blob/main/dotnet/ad/Labs.ActiveDirectoryAuth/OpenIdConnectWithDownstreamConfiguration.cs){: .blank }
  - Add Delegated Permissions for Azure Storage to the service principal
    - Select `user_impersonation` when assigning permissions. This will allow the application to access the Azure Storage on behalf of user.
    ![](/assets/images/azure/exam/ad-auth-store-perm.png)
  - Assign `Storage Blob Data Contributor` permissions to the Login User
  - [Use Token to Call Storage API](https://github.com/guptanikx/azure-hack/blob/main/dotnet/ad/Labs.ActiveDirectoryAuth/StorageAccount/StorageAccountController.cs){: .blank}

---

# References
- [For Interactive SignIn Users](https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2/tree/master/1-WebApp-OIDC){: .blank }
- [Samples](https://learn.microsoft.com/en-us/azure/active-directory/develop/sample-v2-code){: .blank }