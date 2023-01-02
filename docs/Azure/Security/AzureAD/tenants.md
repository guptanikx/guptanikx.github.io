---
title: Azure AD Tenants
---

- For value of `TenantId` select value as per option selected when creating App Registration
    ![](/assets/images/azure/az-ad-auth-variations.png)
- Possible values for `Supported Account Types`
  - # Azure Single Tenant
    - Users from Same directory
  - # Azure Multi Tenant
    - Users from any Azure Active Directory
  - # Multitenant with Personal Microsoft Accounts
    - Users from any Azure Active Directory and Personal Microsoft Accounts
  - # Personal Microsoft Accounts Only
- As per the selected Account Type the property [`signInAudience`](app-manifest.html) changes in AppManifest