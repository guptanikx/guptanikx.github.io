---
title: Virtual Machine Boot Diagnostics
categories: 
  - "virtual-machine"
tags: 
  - "monitoring"
  - "virtual-machine"
---

- Declare Variable for Storage Name
- Create `cloud-init.yaml` with below contents. It will install nginx on VM `STORAGE=metricsstorage$RANDOM`
- Create Storage Account
```bash
az storage account create --name $STORAGE --sku Standard_LRS --location eastus2 -g lab
```
- Create VM with Boot Diagnostics Storage
```bash
az vm create --name monitored-linux-vm --image UbuntuLTS --size Standard_B1s --location eastus2 \\
	--admin-username azureuser	--boot-diagnostics-storage $STORAGE	\
	--resource-group 9250bc57-dde5-4640-accb-94062756c201 --generate-ssh-keys
```
- Enable Boot Diagnostics
```bash
az vm boot-diagnostics enable --name monitored-linux-vm -g lab
```
