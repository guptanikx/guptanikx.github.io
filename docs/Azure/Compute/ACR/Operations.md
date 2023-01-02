---
title: "Azure Container Registry Operations"
categories: 
  - "acr"
tags: 
  - "container-registry"
---

- Create container Registry
```bash
New-AzContainerRegistry -Name "lab204" -ResourceGroupName "lab204" -Location "EastUS" -Sku "Basic" -EnableAdminUser
New-AzContainerRegistry -Name "lab204" -ResourceGroupName "lab204" -Location "EastUS" -Sku "Standard" 
New-AzContainerRegistry -Name "lab204" -ResourceGroupName "lab204" -Location "EastUS" -Sku "Premium"
```

- Tag and Push the image to Azure Container Registry
```bash
docker build -t=acsapi:2 .
docker tag acsapi:2 lab204.azurecr.io/lab204/acsapi
docker push lab204.azurecr.io/lab204/acsapi
```

- Get Credential for Container Registry
```bash
Get-AzContainerRegistryCredential -ResourceGroupName "lab204" -Name "lab204"
```

- Use UserName and Password from above command
```bash
$cred = Get-Credential
New-AzContainerGroup -ResourceGroupName "lab204" -Name "lab204-ci" -Image lab204.azurecr.io/lab204/acsapi:latest \`
	-Location "EastUS" -Cpu 1 -MemoryInGB 2 -DnsNameLabel "acsapi" -RegistryCredential $cred
```