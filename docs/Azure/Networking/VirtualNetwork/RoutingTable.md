---
title: "Azure Routing Table"
categories: 
  - "networking"
tags: 
  - "networking"
---

- Create Virtual Network with name lab-vnet and subnet FrontEnd
```bash
az network vnet create -g lab -n lab-vnet --address-prefix 10.0.0.0/16 --subnet-name default \
	--subnet-prefix 10.0.1.0/24 
az network vnet subnet create -g lab --vnet-name lab-vnet -n FrontEnd --address-prefixes 10.0.2.0/24
```

- Two Steps are mandatory to configure Route Table
  - Association to Subnets
  - Create Routing Rules

-  Associate Route table to subnet
	```bash
	az network vnet subnet update --route-table lab-frontend-route --vnet-name lab-vnet --name FrontEnd -g lab
	```
			
-  Create Routing Rule
   - Below example with redirect traffic going gto 10.0.0.0/16 to Internet
	```bash
	az network route-table route create -n lab-default-redirect-route --address-prefix 10.0.0.0/16 --route-table-name lab-frontend-route --next-hop-type Internet -g lab
	``` 

-  Network Route CLI options
