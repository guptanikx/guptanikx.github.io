---
title: "Network Security Group"
date: "2021-03-12"
categories: 
  - "networking"
tags: 
  - "networking"
---

##### Create Virtual Network with name lab-vnet and subnet FrontEnd
```bash
az network vnet create	-g lab -n lab-vnet --address-prefix 10.0.0.0/16 --subnet-name default \
	--subnet-prefix 10.0.1.0/24 
az network vnet subnet create -g lab --vnet-name lab-vnet -n FrontEnd --address-prefixes 10.0.2.0/24
```
- Create New Network Security Group (NSG)
```bash
az network nsg create --name lab-nsg-frontend -g lab
```				
- Add Rule to NSG (Deny All Incoming Calls to Http PORT 80)
```bash
az network nsg rule create --nsg-name lab-nsg-frontend -g lab --name lab-frontend-rule-80 \
	--priority 100 --source-address-prefixes '*' --source-port-ranges 80 \          --destination-address-prefixes '*' --destination-port-ranges 80 --access Deny \
	--protocol Tcp --description "Sample Lab to block 80 port"
```	

- Update Subnet to Associate NSG with FrontEnd Subnet
```bash
az network vnet subnet update -g lab -n FrontEnd --vnet-name lab-vnet --nsg lab-nsg-frontend
```

- Update Network Interface to Associate NSG
```bash
az network nic update --name lab-nic-frontend -g lab --network-security-group lab-nsg-frontend
```

- Create Network Security Group Response
