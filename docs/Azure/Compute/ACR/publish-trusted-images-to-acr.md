---
title: "Publish Trusted Images to Azure Container Registry"
date: "2021-03-07"
categories: 
  - "acr"
---

Assign `AcrImageSigner` role to the user who can then will have publish rights for trusted images to Azure Container Registry
{: .msg-info }

- Create a new user with `AcrImageSigner` role
```bash
New-AzADUser -UserPrincipalName "imagesigner@cloudx-labs.in" -DisplayName "image-signer" -MailNickName "imagesigner"
New-AzRoleAssignment -ResourceGroupName "lab204" -SignInName "imagesigner@cloudx-labs.in" -RoleDefinitionName "AcrImageSigner"
```
```bash
az role assignment create --role AcrImageSigner --assignee imagesigner@devignite.in
```

- Enable Image Trust in Registry
```bash
az acr config content-trust update --status enabled -g "lab204" --name "lab204"
```

---

### References
- [Generate Docker Trust Keys](https://docs.docker.com/engine/security/trust/trust_delegation/#creating-delegation-keys)  
- [Docker User Trust](https://docs.docker.com/engine/security/trust/content_trust/)
