---
title: Publish Docker Image to Azure Container Registry
categories: 
  - "azure container registry"
tags:
  - "docker image publish"
---

- Create Common Variables
  ```bash
  export RG=lab204
  export REPO_NAME=lab204repo
  ```
---
- Create ACR Repository
  ```bash
  az acr create -g $RG -n $REPO_NAME --admin-enabled true --sku Basic 
  ```
    - Parameters
    - `sku` 
      - Basic - Should be used strictly for Testing or DEV environment only
      - Standard - Enables Load Balancing, SSL, Custom Domain
      - Premium - All above with CDN and Premium Plans with High Bandwidth and Performant machines
      
    ---
- Get `Login Server` property which is also `Registry Url` for tagging and pushing docker images
  ```bash
  export REGISTRY_URL=$(az acr show -n $REPO_NAME --query loginServer -o tsv)
  ```
---
- [Use Source Code to Build Image](https://github.com/guptanikx/azure-hack/tree/main/DeployableApps/dotnet/Labs.DockerLinuxApp){: .blank}

- Build Docker Image
  ```bash
  docker build -t demoapp:v1 .
  ```

- Tag the Docker Image with ACR Repo we created above
  ```bash
  docker image tag demoapp:v1 $REGISTRY_URL/demoapp:v1
  ```

- Get the Access Keys from ACR Repo using Azure Portal
  ```bash
  export USERNAME=$(az acr credential show -n $REPO_NAME -g $RG --query username)
  export PASSWORD=$(az acr credential show -n $REPO_NAME -g $RG --query passwords[0].value)
  ```

- Login Into ACR Repo
  ```bash
  docker login -u $USERNAME -p $PASSWORD $REPO_URL
  ```

- Push the image to ACR
  ```bash
  docker push $REGISTRY_URL/demoapp:v1
  ```

---

- ### References
  - [Container Registry](https://learn.microsoft.com/en-us/azure/container-registry/){: .blank}
