---
title: Integrate AzureAD Authentication With Application
categories: 
  - "azuread"
tags: 
  - "azure authentication"
  - "app registration"
---

- Create simple AspNetCore WebAPI with default Options without any Authentication
- Create a new App Registration in Azure AD and select `Supported Account Types`
  - Azure Single Tenant
  - Azure Multi Tenant
  - Multitenant with Personal Microsoft Accounts
  - Personal Microsoft Accounts Only
    - As per the selected account type you have to change the TenantId in next steps

- [Source Code](https://github.com/guptanikx/azure-hack/blob/main/dotnet/ad/Labs.ActiveDirectoryAuth/AzureAdExtensions.cs)
  - Update Details from Registered Application above code
  - Assign redirect URI in Azure App Registration as `https://localhost:<port>/signin-oidc`
  - For value of `TenantId` select value as per option selected when creating App Registration
    ![](/assets/images/azure/az-ad-auth-variations.png)

- Start the Application
  Once App is Started you will be asked to Login with AzureAD account. As we have not restricted any user from login you can provide any user credentials to login into the app.