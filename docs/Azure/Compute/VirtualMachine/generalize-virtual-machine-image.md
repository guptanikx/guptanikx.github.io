---
title: "Generalize Virtual Machine Image"
date: "2021-03-07"
categories: 
  - "virtual-machine"
tags: 
  - "virtual-machine"
---

A generalized image can be used as a base machine with required application/configuration to be used for creating several virtual machines 
{: .msg-info }
 
The generalized image will contain all the disks associated with Virtual Machine
{: .msg-info }

- ### Generalize Windows Virtual machine
  - Run `sysprep` on your machine and select shutdown
    ![](/assets/images/VM_sysprep.png)

  - DeAllocate Virtual Machine
  ```bash
  Stop-AzVM -ResourceGroupName <resource group> -Name <virtual machine name> -Force
  ```
  ```bash
  az vm deallocate -g lab --name vm-name
  ```
  - Generalize the VM
  ```bash
  Set-AzVM -ResourceGroupName <resource group> -Name <virtual machine name> -Generalize
  ```
  ```bash
  az vm generalize --name virtual-machine-name
  ```

- ### Generalize Linux Virtual Machine
  - Login into VM and run
  ```bash
  waagent -deprovision+user
  ```
  - Generalize the VM
  ```bash
  Set-AzVM -ResourceGroupName <resource group> -Name <virtual machine name> -Generalize
  ```
  ```bash
  az vm generalize --name virtual-machine-name
  ```

Next, We will leverage either Windows or Linux Virtual machine we created above to Create a Azure Virtual Machine base image. Without creating this image we cannot create Virtual Machines.
{: .msg-info }

- ### Create Virtual Machine Image using above De-Allocated images
  ```bash
  $vm = Get-AzVM -ResourceGroupName <resource group> -Name <generalized virtual machine>
  $image = New-AzImageConfig -SourceVirtualMachineId $vm.ID -Location <virtual machine location>
  New-AzImage -Image $image -ImageName image-name -ResourceGroupName $resource-group
  ```
  ```bash
  az image create \
          --name #image-name \
          --resource-group lab \
          --source generalized-virtual-machine
  ```

  - Create new Virtual Machine using above image
  ```
  az vm create \
        --name MyVMFromImage \
        --computer-name MyVMFromImage \
        --image MyVMImage \
        --admin-username azureuser
  ```

  - Update default WebPage with custom name
    
    Using Virtual Machine CustomScriptExtension we will execute Powershell to clear existing IIS website "default.htm" and add hostname for current virtual machine.
    {: .msg-info }

    ```bash
    az vm extension set \
            --name CustomScriptExtension \
            --vm-name MyVMFromImage \
            --publisher Microsoft.Compute \
            --settings '{"commandToExecute":"powershell Clear-Content -Path \"C:\\inetpub\\wwwroot\\Default.htm\"; Add-Content -Path \"C:\\inetpub\\wwwroot\\Default.htm\" -Value $(hostname)"}'
    ```
