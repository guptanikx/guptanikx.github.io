---
title: Azure - Create Simple Batch
---

### Commands
- Create Azure Batch Account
```bash
az batch account create \
    --name nikxlabbatch \
    -g lab \
    -l eastus
```
- Sign in your batch account
```bash
az batch account login \
    --name nikxlabbatch \
    -g lab \
    --shared-key-auth
```
- Create a Pool
```bash
az batch pool create \
    --id mypool --vm-size Standard_A1_v2 \
    --target-dedicated-nodes 3 \
    --image canonical:ubuntuserver:16.04-LTS \
    --node-agent-sku-id "batch.node.ubuntu 16.04"
```
- Show Status
  - `Resizing` - being provisoned
  - `steady` - ready
  ```bash
  az batch pool show --pool-id mypool \
      --query "allocationState"
  ```
- Create batch job
```bash
az batch job create \
        --id myjob \
        --pool-id mypool
```
- Create batch tasks
```bash
for i in {1..10}
do
    az batch task create \
    --task-id mytask$i \
    --job-id myjob \
    --command-line "/bin/bash -c 'echo \$(printenv | grep \AZ_BATCH_TASK_ID) processed by; echo \$(printenv | grep \AZ_BATCH_NODE_ID)'"
done
```
- Delete Batch Job
  ```bash
  az batch job delete --job-id myjob -y
  ```

---

### Resources
 - [Monitoring](https://azure.github.io/BatchExplorer/)
    

