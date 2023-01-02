---
title: Azure AD Commands
---

# Create App Registration
  - Single tenant with ID Token
    ```bash
     az ad app create --display-name openid-app-2 --sign-in-audience AzureADMyOrg --enable-id-token-issuance --web-redirect-uris http://localhost:7071/signin-oidc
    ```

---

# References
