---
title: "Site to Site VPN (Both Networks in Azure)"
date: "2021-03-12"
categories: 
  - "networking"
tags: 
  - "networking"
---

- Support for `IKEv1` only
- Uses `Static Routing`. The Source and Destination are declared through Policy rather than routing tables.
- Compatible with Legacy On-Premises devices
{: .msg-info}

- Architecture
![](VPN_01.svg)

As Site To Site VPN require actual connection to Azure using Third Party Provider we cannot create it for Lab. We will create a VPN simulating Express Network

- Create Virtual Network in Azure
```bash
az network vnet create -g lab --name Azure-VNet-1 --address-prefix 10.0.0.0/16 --subnet-name Services --subnet-prefix 10.0.0.0/24     
az network vnet subnet create -g lab --vnet-name Azure-VNet-1 --address-prefix 10.0.255.0/27 --name GatewaySubnet     
az network local-gateway create -g lab --gateway-ip-address 94.0.252.160 --name LNG-HQ-Network --local-address-prefixes 172.16.0.0/16`
```	

- Create Simulated On-Prem Network
```bash
az network vnet create -g lab --name HQ-Network --address-prefix 172.16.0.0/16 --subnet-name Applications --subnet-prefix 172.16.0.0/24     
az network vnet subnet create -g lab --address-prefix 172.16.255.0/27 --name GatewaySubnet --vnet-name HQ-Network     
az network local-gateway create -g lab --gateway-ip-address 94.0.252.160 --name LNG-Azure-VNet-1 --local-address-prefixes 10.0.0.0/16
```

- Create Azure Side VPN gateway
```bash
az network public-ip create -g lab --name PIP-VNG-Azure-VNet-1 --allocation-method Dynamic     
az network vnet-gateway create -g lab --name VNG-Azure-VNet-1 --public-ip-address PIP-VNG-Azure-VNet-1 --vnet Azure-VNet-1 --gateway-type Vpn --vpn-type RouteBased --sku VpnGw1 --no-wait`
```			

- Create simulated OnPrem VPM Gateway
```bash
az network public-ip create  -g lab --name PIP-VNG-HQ-Network --allocation-method Dynamic     
az network vnet-gateway create -g lab  --name VNG-HQ-Network --public-ip-address PIP-VNG-HQ-Network --vnet HQ-Network --gateway-type Vpn --vpn-type RouteBased --sku VpnGw1 --no-wait
```

- Verify Topology
```bash
az network vnet list --output table     
```
```bash
az network local-gateway list -g lab --output table
```		
			
- Watch for updates
```bash
watch -d -n 5 az network vnet-gateway list -g lab --output table
```

- Update the remote gateway IP address references that are defined in the local network gateways
```bash
PIPVNGAZUREVNET1=$(az network public-ip show -g lab --name PIP-VNG-Azure-VNet-1 --query "[ipAddress]" --output tsv)     
az network local-gateway update -g lab --name LNG-Azure-VNet-1 --gateway-ip-address $PIPVNGAZUREVNET1
```

- Update the remote gateway IP address references that are defined in the remote network gateways
```bash
PIPVNGHQNETWORK=$(az network public-ip show -g lab  --name PIP-VNG-HQ-Network --query "[ipAddress]" --output tsv)     
az network local-gateway update -g lab --name LNG-HQ-Network --gateway-ip-address $PIPVNGHQNETWORK
```				
			

![](/assets/images/VPN_06.svg) 
![](/assets/images/VPN_07.svg)

---

### References
- [VPN Gateway](https://docs.microsoft.com/en-us/learn/modules/connect-on-premises-network-with-vpn-gateway/4-exercise-create-a-site-to-site-vpn-gateway-using-azure-cli-commands)
