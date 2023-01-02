---
title: App Registration
---

- Create New App Registration from Azure Active Directory -> App Registrations
- [Supported Account Types](tenants){: .blank }
- Simple Redirect URI can take one form as below 
  - DEV  - `https://localhost:7071/signin-oidc`
  - PROD - `https://<deployed-app-url>/signin-oidc`
- Enable Token Issuance as per requirements from Sample
  - ID Token - Only for Authentication
  - AccessTokens - For Authorization

---

- # For Downstream API like Microsoft Graph
  - Under `API Permissions` grant Admin consent to User.Read for Microsoft Graph