---
title: "Azure Virtual Network Interface"
date: "2021-03-12"
categories: 
  - "networking"
tags: 
  - "networking"
---

- Create Virtual Network Interface with name lab-vnet and subnet FrontEnd
```bash
az network vnet create -g lab -n lab-vnet --address-prefix 10.0.0.0/16 --subnet-name default --subnet-prefix 10.0.1.0/24 az network vnet subnet create -g lab --vnet-name lab-vnet -n FrontEnd --address-prefixes 10.0.2.0/24
```

- Complete Hub N Spokre ARM Template
```json
{
  "newVNet": {
    "addressSpace": {
      "addressPrefixes": [
        "10.0.0.0/16"
      ]
    },
    "bgpCommunities": null,
    "ddosProtectionPlan": null,
    "dhcpOptions": {
      "dnsServers": []
    },
    "enableDdosProtection": false,
    "enableVmProtection": false,
    "id": "/subscriptions/sub-id/resourceGroups/lab/providers/Microsoft.Network/virtualNetworks/lab-vnet",
    "ipAllocations": null,
    "location": "eastus",
    "name": "lab-vnet",
    "provisioningState": "Succeeded",
    "resourceGroup": "lab",
    "resourceGuid": "64efec56-c504-49d8-9514-765abedc9a79",
    "subnets": [
      {
        "addressPrefix": "10.0.1.0/24",
        "addressPrefixes": null,
        "delegations": [],
        "etag": "W/"f1d90cab-c965-4ace-b4a1-cc20a187f8f2"",
        "id": "/subscriptions/sub-id/resourceGroups/lab/providers/Microsoft.Network/virtualNetworks/lab-vnet/subnets/default",
        "ipAllocations": null,
        "ipConfigurationProfiles": null,
        "ipConfigurations": null,
        "name": "default",
        "natGateway": null,
        "networkSecurityGroup": null,
        "privateEndpointNetworkPolicies": "Enabled",
        "privateEndpoints": null,
        "privateLinkServiceNetworkPolicies": "Enabled",
        "provisioningState": "Succeeded",
        "purpose": null,
        "resourceGroup": "lab",
        "resourceNavigationLinks": null,
        "routeTable": null,
        "serviceAssociationLinks": null,
        "serviceEndpointPolicies": null,
        "serviceEndpoints": null,
        "type": "Microsoft.Network/virtualNetworks/subnets"
      }
    ],
    "tags": {},
    "type": "Microsoft.Network/virtualNetworks",
    "virtualNetworkPeerings": []
  }
}
```

---

### References
