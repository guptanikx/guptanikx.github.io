---
title: CosmosDB - Database Triggers
---

For partitioned containers, when executing a trigger, a partition key value must be provided in the 
request options. 
{: .msg-info }

- Create CosmosDb account
  ```bash
  az cosmosdb create -g lab -n nikxlabcosmos --enable-free-tier true
  ```
- Create db with SQL api in cosmos account
  ```bash
   az cosmosdb sql database create -a nikxcosmos -n dbhotel -g lab204
  ```
- Create container in above db
  ```bash
  az cosmosdb sql container create -g lab204 -a nikxcosmos -d dbhotel -n hotels -p /country
  ```
- Create a Pre-Trigger with below content
  ```javascript
  // Trigger Functions do not take any parameters
  function preInsertTrigger() {
      var context = getContext();
      var request = context.getRequest();

      // item data which is attempted to be inserted in container
      var itemToCreate = request.getBody();

      // validate properties
      if (!("trigger_key" in itemToCreate)) {
          var ts = new Date();
          itemToCreate["trigger_key"] = ts.getTime();
      }

      // update the item that will be created
      request.setBody(itemToCreate);
  }
  ```
  - Parameters
    - `getContext()`
      - internal method by cosmos framework which provides current execution context
    - `getRequest()`
      - gets the request due to which trigger has been invoked
    - `request.getBody()`
      - reads the incoming request item data
    - `Possible values for TriggerOperation`
      - All
      - Create
      - Update
      - Delete
      - Replace

- [Reference Code To register script and invoke trigger](https://github.com/guptanikx/azure-hack/blob/main/dotnet/Labs.CosmosDb/Activities/PreTriggerDemo.cs){: .blank}
  

---

# References
- [Pre Triggers](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/how-to-write-stored-procedures-triggers-udfs?tabs=javascript#pre-triggers)