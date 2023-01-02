---
title: "Applying Storage Access Restrictions"
date: "2021-03-12"
categories: 
  - "storage"
tags: 
  - "cloud-storage"
---

- Create Storage Account without public endpoints
```bash
az storage account create --name lab204genstorage -g lab204 --allow-blob-public-access false --access-tier Hot \
--sku Standard_LRS --kind StorageV2 --publish-microsoft-endpoints true --min-tls-version TLS1_2
```

- Attach Storage account to Private Virtual Network Subnet in different resource group
```bash
$subnet = az network vnet subnet show --name default --vnet-name lab204-vnet -g lab-vm --query "id" -o tsv  az storage account network-rule add --account-name lab204genstorage --subnet $subnet -g lab204
```

- Add Service Endpoint at subnet level (More Restrictive)
```bash
az network vnet subnet update -g lab-vm --vnet-name lab204-vnet -n default --service-endpoints Microsoft.Storage
```

- Deny Access from All Networks option in Firewalls and Virtual networks
```bash
az storage account update -g lab204 --name lab204genstorage --default-action Deny
```

- Upload file from same VNet
- Create a Virtual Machine in same Virtual network as the Storage Account
- Upload File from Virtual Machine
```bash
az storage blob upload --account-name lab204blobstorage -f films.json -c datasets -n films.json --account-key <key>
```

---

### References
- [Storage Account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&tabs=azure-portal)
