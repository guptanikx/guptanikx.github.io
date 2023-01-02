---
title: "Create Azure Linux Virtual Machine"
tags: 
  - "linux virtual machine"
  - "virtual machine"
---

- Create Simple Virtual Machine
```bash
az vm create -n lab-204-linux -g lab-vm --image UbuntuLTS --admin-username nikx --size Standard_B2s \
--admin-password Password@123  --public-ip-address-dns-name lab-204-linux-vm --vnet-name lab204-vnet --subnet default
```

- With Specific virtual network
```bash
az vm create -n lab-204-linux -g lab-vm --image UbuntuLTS --admin-username nikx \
--size Standard_B2s --admin-password Password@123  --public-ip-address-dns-name lab-204-linux-vm \
--vnet-name lab204-vnet --subnet default
```

- Deploy VM for Internal Load Balancer / Availability Set
```bash
az deployment group create --name lab-104-lb-avail -g lab-104 -f vm-linux-availset.json --no-wait
```

- Deploy VM for Load Balancer 
```bash
az deployment group create --name lab-104-lb -g lab-104 -f vm-linux.json --parameters vm-index=1 vnet-name=lab-104-lb-vnet --no-wait az deployment group create --name lab-104-lb -g lab-104 -f vm-linux.json --parameters vm-index=2 vnet-name=lab-104-lb-vnet --no-wait 
```

----

{% include_absolute 'docs/Azure/common-cli.md' %}
