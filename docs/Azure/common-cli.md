- Common CLI
```bash
az vm image list-publishers -l eastus 
az vm image list-offers -l eastus -p canonical 
az vm image list-offers -l eastus -p canonical --query "[?contains(name, 'ubuntu')]" 
az deployment group create --name lab-104-vm -g lab-104 -f vm-win.json --parameters vm-index=1 vnet-name=lab-104-vnet 
```
