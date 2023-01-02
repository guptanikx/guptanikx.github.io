---
title: Simple Container App Deployment
---

- For Complete Activity go to References
- Container App Environment in Azure is similar to namespace in Kubernetes
  ```bash
  az containerapp env create \
    --name lab204-env \
    --resource-group lab204 \
    --location eastus
  ```
- Deploy Container App
  ```bash
  az containerapp create \
    --name lab204-app -g lab204 --environment lab204-env \
    --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
    --target-port 80 \
    --ingress 'external' \
    --query properties.configuration.ingress.fqdn
  ```
- With Private Container Registry Eg. ACR
  ```bash
  az containerapp create \
    --name lab204-app -g lab204 --environment lab204-env \
    --image lab204acr.azurecr.io/linuxapp:v2 \
    --target-port 80 \
    --ingress 'external' \
    --registry-server lab204acr.azurecr.io --registry-username lab204acr \
    --registry-password <key>
  ```

# Add Secret and Environment Variables to deployed Container App
- Add Secret
  ```bash
  az containerapp secret set --secrets 'testsec=sec1' -g lab204 -n linuxapp
  ```
- Add Environment Variable referencing Secret
  ```bash
  az containerapp update --set-env-vars 'secenv=secretref:testsec' -g lab204 -n linuxapp
  ```

---

# References
- [Deploy Simple App](https://learn.microsoft.com/en-us/azure/container-apps/get-started?tabs=bash)
- [Manage Secrets](https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets?tabs=azure-cli)