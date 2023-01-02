---
title: "Deploy in Environment Resource as Virtual Machine"
date: "2021-03-12"
categories: 
  - "azure devops"
tags: 
  - "deployment"
  - "devops"
  - "dotnet deployment"
---

### Provisioning

- Create Environment and [Add Virtual Machine](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/environments-virtual-machines?view=azure-devops) resource
    
- [Deployment YAML](https://github.com/guptanikx/devops-hack/blob/main/azure/deploy-azure-vm.yaml)
    - Params
      - `deployment` : should be `VMDeploy`
      - `resourceType` : should be `VirtualMachine`
