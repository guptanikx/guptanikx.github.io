---
title: "Using Delegation Key to Restrict user access"
date: "2021-03-12"
categories: 
  - "storage"
tags: 
  - "cloud-storage"
---

#### Important

- User Delegation Key only works with Azure Blob Storage and not GeneralPurposev1 or v2
- Assign Appropriate permissions for generating key
    - Owner
    - Contributor
    - Storage Account Contributor
    - Storage Blob Data Contributor
    - Storage Blob Data Owner
    - Storage Blob Data Reader
    - Storage Blob Delegator

- ### Generate user Delegation Key
```bash
az storage container generate-sas --account-name "lab204storage" --name "testlifetier"     --permissions "acdlrw" --expiry "2020-08-26T13:27:32Z" --auth-mode "login" --as-user
```
  - Parameters
    - Permissions
      - `(a)dd`Â  `(c)reate`Â  `(d)elete (l)ist`Â  `(r)ead`Â  `(w)rite`
    - Resource
      - `b` - Applied to blob and it's metadata
      - `c` - Applies to container and all it's blob and their metadata
      - `bs` - for blob snapshot only
      - `bv` - for versions of Blob

---

- ### References
  - [Soft Delete](https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable?tabs=azure-CLI)
