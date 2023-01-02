---
title: Azure AD Application Manifest
categories: 
  - "azuread"
---

- `accesstokenAcceptedVersion`
  - `null` or `1` for v1.0 Access Tokens
  - `2` for v2.0 Access Tokens
    - Must be 2 when `signInAudience` is `Multi-Tenant`

---

- `signInAudience`
  - `AzureADMyOrg` - Single Tenant Within Same AD
  - `AzureADMultipleOrgs` - Multi Tenant with Different Azure AD
  - `AzureADandPersonalMicrosoftAccount` - Multi Tenant with Personal Microsoft Account
  - `PersonalMicrosoftAccount` - Personal microsoft Accounts only

  ---

# References
  - [Manifest](https://learn.microsoft.com/en-us/azure/active-directory/develop/reference-app-manifest#manifest-reference)