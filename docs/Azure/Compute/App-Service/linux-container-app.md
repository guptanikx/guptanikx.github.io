---
title: Deploy Linux Webapp in Container and Log Stream
categories: 
  - "appservice"
  - "linux webapp"
---

- When deploying from container or Docker the following AppSettings are mandatory
  - `DOCKER_REGISTRY_SERVER_URL`
      - The Registry Server Url which can be any registry server
      - This should be in the form `<acr-name>.azurecr.io`
  - `DOCKER_REGISTRY_SERVER_USERNAME`
  - `DOCKER_REGISTRY_SERVER_PASSWORD`
      - Container Registry Credentials (UserName and Password)
  - `WEBSITES_ENABLE_APP_SERVICE_STORAGE`
      - Storage is not shared across shared instances
{: .msg-info}

- [Build and Publish Azure Container Image](/docs/Azure/Compute/ACR/publish-image){: .blank}

- [Use ARM template and replace values in parameters](https://github.com/guptanikx/azure-hack/blob/main/iac/azure/webapp/linux_docker.json){: .blank}
```bash
az deployment group create -n samplewebapp -g lab204 --template-file lin_docker.bicep
```
---
- Configure Docker container logging
```bash
az webapp log config -n $NAME -g $RG --docker-container-logging filesystem
```
- [Refer Logs](logs){: .blank} for different types of logging configurations

---

# References
- [WebApp Logging](https://learn.microsoft.com/en-us/cli/azure/webapp/log?view=azure-cli-latest#az-webapp-log-config){: .blank}