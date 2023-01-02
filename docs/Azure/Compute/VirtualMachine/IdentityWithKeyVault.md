---
title: "Virtual Machine Managed Identity with KeyVault"
categories: 
  - "virtual-machine"
tags: 
  - "virtual-machine"
---

Virtual Machine managed identity is part of Access management where we can assign roled at Virtual machine level, so that application has only restricted permissions as per Virtual machine identity. The application running inside Virtual Machine can access resources as per managed identity permissions.
{: .msg-info}


In this use case we will create a KeyVault and store Db credentials and then we will provide read only access to Resource like Virtual Machine.
{: .msg-info}


- Declare Variables
```bash
export VMNAME=lab-identity-demo
export KVNAME=lab-keyvault$RANDOM
export VMNAME=lab-vm$RANDOM
export RG=lab-identity
export DBCRED="Server=tcp:prodserverSQL.database.windows.net,1433;Database=myDataBase;User ID=mylogin@myserver;Password=examplePassword;Trusted_Connection=False;Encrypt=True;"
```

- Create KeyVault secret
```bash
az keyvault create --name $KVNAME \
        --resource-group $RG \
        --default-action Allow \
        --location $(az resource list --output tsv --query [0].location) \
        --sku standard
```

- Generalize the VM
```bash
Set-AzVM -ResourceGroupName <resource group> -Name <virtual machine name> -Generalize
```
```bash
az vm generalize --name $VMNAME
```

- Create Virtual Machine
  - Create Virtual Machine and get the PublicIpAddress of the machine using [jmes query]
```bash
export publicIP = $(az vm create \
        --name $VMNAME \
        --resource-group learn-f18c9a7e-7611-43ba-aad1-9dbd98d7d066 \
        --image UbuntuLTS \
        --generate-ssh-keys \
        --output tsv \
        --query "publicIpAddress")
```
- Assign Managed Identity
```bash
az vm identity assign \
        --name $VMNAME \
        --resource-group $RG
```

- Store Database Credentials to KeyVault**
```bash
az keyvault secret set \
        --vault-name $KVNAME \
        --name DBCredentials \
        --value $DBCRED
```

---

### References
- [Virtual Machine Managed identity](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/tutorial-windows-vm-access-arm)
