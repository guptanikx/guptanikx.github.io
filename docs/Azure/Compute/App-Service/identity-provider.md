---
title: Webapp Identity Provider
---

- Configure Identity Provider from WebApp Proprties
    ![](/assets/images/azure/exam/webapp_ident_1.png)
- Try to browse the Deployed WebApp page and you will be redirected for OAuth Consent page
  Below Headers are injected by Identity Providers validating Authentication
  - `X-MS-CLIENT-PRINCIPAL-NAME` - The Email or Username used during Authentication
  - `X-MS-CLIENT-PRINCIPAL` - MS Token
  - `X-MS-TOKEN-AAD-ACCESS-TOKEN` - Access Token
  - `X-MS-TOKEN-AAD-ID-TOKEN` - ID Token