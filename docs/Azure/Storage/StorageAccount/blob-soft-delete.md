---
title: "Blob Storage Soft Delete"
categories: 
  - "storage"
tags: 
  - "azure storage"
---

- Soft delete works for root blob and snapshots
- Soft delete does not afford overwrite protection for blobs in the archive tier
- Soft Delete default status
  - Blob Service - Disabled
  - File Service - Enabled
{: .msg-info }

- Create Group and Storage Account
```bash
az group create -n lab204 -l eastus
```
```bash
 az storage account create -n lab204storage -g lab204 --access-tier Hot -l eastus --min-tls-version TLS1_2 --sku Standard_LRS
```

- Create a container and upload a Blob file
```bash
az storage container create -n softdelete --account-name lab204storage 
```
```bash
az storage blob upload -f films.json -n films.json --account-name lab204storage -c softdelete
```

- Enable soft delete for uploaded blob file
```bash
az storage blob service-properties delete-policy update --days-retained 7  --account-name lab204storage --enable true
```

- Create Snapshot for the root file
```bash
az storage blob snapshot -c softdelete --account-name lab204storage -n stores.json
```

- Try Deleting the blob and receive the specified error
  ```bash
  az storage blob delete -c softdelete --account-name lab204storage -n stores.json --delete-snapshots include
  ```

- You can Recover the blob and deleted snapshots from root blob properties

- # Tear Down
  ```bash
  az storage account delete -n lab204storage -g lab204
  ```
  
---

### References
- [Soft Delete](https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable?tabs=azure-CLI){: .blank}
