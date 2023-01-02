---
title: "Deployment to ACS"
date: "2021-03-12"
categories: 
  - "azure devops"
tags: 
  - "deployment"
  - "devops"
---

- `checkout` : self
    - checkout is required for `Deploy` job when we need files from source repo and not artifacts
{: .msg-info}

### Provisioning

1. Create Azure Container Registry and create a Service connection named as `cmi-container-registry`
    
2. Create Library for Shared Variables across pipelines namely `LabVariables` and `Services`
    
3. Add below parameters to LabVariables
   - `connection` - Azure Subscription Name with Id (get it when you connect Azure DevOps with Azure Subscription)
   - `groupName` - Resource group name
   - `location` - Resource location
   - `subscriptionId` - Azure Subscription Id

4. Add below parameters to `Services`
   - `password` and `username` - ACR username password from `ACR -> Access Keys`
   - `registryConnection` - Service Connection name created in Step 1
   - `registryName` - ACR name without `.azurecr.io`

5. [Deployment YAML](https://github.com/guptanikx/devops-hack/blob/main/azure/deploy-azure-acs.yaml)
    - Params
      - `environment` : DEV
      - `script` : To check the contents of current directory after checkout. Regular Build Variables will not work in `Deploy` Job
