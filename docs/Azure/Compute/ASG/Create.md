---
title: "Application Security Group"
categories: 
  - "networking"
  - "traffic-manager"
tags: 
  - "networking"
---

ASG are extension of NSGs, allowing us to create additional rules.
ASG has to be associated with VM
{: .msg-info}

- Create Virtual Network with name lab-vnet and subnet FrontEnd
```bash
az network vnet create	-g lab -n lab-vnet --address-prefix 10.0.0.0/16 --subnet-name Frontend	\
	--subnet-prefix 10.0.1.0/24
```
				
- Create New Application Security Group (ASG)
```bash
az network asg create -n lab-asg-web -g lab
```

- Add Rule to NSG (Deny All Incoming Calls to Http PORT 80)
```bash
az network nsg rule create --nsg-name lab-nsg-frontend -g lab --name lab-frontend-rule-80 --priority 100 \
	--source-address-prefixes '*'	--source-port-ranges 80	--destination-address-prefixes '*' \
	--destination-port-ranges 80	--access Deny --protocol Tcp --description "Sample Lab to block 80 port"
```

-  Update Subnet to Associate NSG with FrontEnd Subnet
```bash
az network vnet subnet update	-g lab -n FrontEnd --vnet-name lab-vnet --nsg lab-nsg-frontend
```

- Update Network Interface to Associate NSG
```bash
az network nic update	--name lab-nic-frontend -g lab --network-security-group lab-nsg-frontend
```

- Create Network Security Group Response
```json
{
	"NewNSG": {
		"defaultSecurityRules": [{
			"access": "Allow",
			"description": "Allow inbound traffic from all VMs in VNET",
			"destinationAddressPrefix": "VirtualNetwork",
			"destinationAddressPrefixes": [],
			"destinationApplicationSecurityGroups": null,
			"destinationPortRange": "*",
			"destinationPortRanges": [],
			"direction": "Inbound",
			"id": "/subscriptions/<sub-id>/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowVnetInBound",
			"name": "AllowVnetInBound",
			"priority": 65000,
			"protocol": "*",
			"provisioningState": "Succeeded",
			"resourceGroup": "lab",
			"sourceAddressPrefix": "VirtualNetwork",
			"sourceAddressPrefixes": [],
			"sourceApplicationSecurityGroups": null,
			"sourcePortRange": "*",
			"sourcePortRanges": [],
			"type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
		}, {
			"access": "Allow",
			"description": "Allow inbound traffic from azure load balancer",
			"destinationAddressPrefix": "*",
			"destinationAddressPrefixes": [],
			"destinationApplicationSecurityGroups": null,
			"destinationPortRange": "*",
			"destinationPortRanges": [],
			"direction": "Inbound",
			"id": "/subscriptions/<sub-id>/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowAzureLoadBalancerInBound",
			"name": "AllowAzureLoadBalancerInBound",
			"priority": 65001,
			"protocol": "*",
			"provisioningState": "Succeeded",
			"resourceGroup": "lab",
			"sourceAddressPrefix": "AzureLoadBalancer",
			"sourceAddressPrefixes": [],
			"sourceApplicationSecurityGroups": null,
			"sourcePortRange": "*",
			"sourcePortRanges": [],
			"type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
		}, {
			"access": "Deny",
			"description": "Deny all inbound traffic",
			"destinationAddressPrefix": "*",
			"destinationAddressPrefixes": [],
			"destinationApplicationSecurityGroups": null,
			"destinationPortRange": "*",
			"destinationPortRanges": [],
			"direction": "Inbound",
			"id": "/subscriptions/<sub-id>/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/DenyAllInBound",
			"name": "DenyAllInBound",
			"priority": 65500,
			"protocol": "*",
			"provisioningState": "Succeeded",
			"resourceGroup": "lab",
			"sourceAddressPrefix": "*",
			"sourceAddressPrefixes": [],
			"sourceApplicationSecurityGroups": null,
			"sourcePortRange": "*",
			"sourcePortRanges": [],
			"type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
		}, {
			"access": "Allow",
			"description": "Allow outbound traffic from all VMs to all VMs in VNET",
			"destinationAddressPrefix": "VirtualNetwork",
			"destinationAddressPrefixes": [],
			"destinationApplicationSecurityGroups": null,
			"destinationPortRange": "*",
			"destinationPortRanges": [],
			"direction": "Outbound",
			"id": "/subscriptions/<sub-id>/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowVnetOutBound",
			"name": "AllowVnetOutBound",
			"priority": 65000,
			"protocol": "*",
			"provisioningState": "Succeeded",
			"resourceGroup": "lab",
			"sourceAddressPrefix": "VirtualNetwork",
			"sourceAddressPrefixes": [],
			"sourceApplicationSecurityGroups": null,
			"sourcePortRange": "*",
			"sourcePortRanges": [],
			"type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
		}, {
			"access": "Allow",
			"description": "Allow outbound traffic from all VMs to Internet",
			"destinationAddressPrefix": "Internet",
			"destinationAddressPrefixes": [],
			"destinationApplicationSecurityGroups": null,
			"destinationPortRange": "*",
			"destinationPortRanges": [],
			"direction": "Outbound",
			"id": "/subscriptions/<sub-id>/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowInternetOutBound",
			"name": "AllowInternetOutBound",
			"priority": 65001,
			"protocol": "*",
			"provisioningState": "Succeeded",
			"resourceGroup": "lab",
			"sourceAddressPrefix": "*",
			"sourceAddressPrefixes": [],
			"sourceApplicationSecurityGroups": null,
			"sourcePortRange": "*",
			"sourcePortRanges": [],
			"type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
		}, {
			"access": "Deny",
			"description": "Deny all outbound traffic",
			"destinationAddressPrefix": "*",
			"destinationAddressPrefixes": [],
			"destinationApplicationSecurityGroups": null,
			"destinationPortRange": "*",
			"destinationPortRanges": [],
			"direction": "Outbound",
			"id": "/subscriptions/<sub-id>/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/DenyAllOutBound",
			"name": "DenyAllOutBound",
			"priority": 65500,
			"protocol": "*",
			"provisioningState": "Succeeded",
			"resourceGroup": "lab",
			"sourceAddressPrefix": "*",
			"sourceAddressPrefixes": [],
			"sourceApplicationSecurityGroups": null,
			"sourcePortRange": "*",
			"sourcePortRanges": [],
			"type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
		}],
		"flowLogs": null,
		"id": "/subscriptions/<sub-id>/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend",
		"location": "eastus",
		"name": "lab-nsg-frontend",
		"networkInterfaces": null,
		"provisioningState": "Succeeded",
		"resourceGroup": "lab",
		"resourceGuid": "7c0cf798-4418-44f5-91ed-0d91f4c32ad1",
		"securityRules": [],
		"subnets": null,
		"tags": null,
		"type": "Microsoft.Network/networkSecurityGroups"
	}
}
```
