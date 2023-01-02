---
title: CosmosDB - Database Triggers
---

- For partitioned containers, when executing a stored procedure, a partition key value must be provided in the request options. 
- Stored procedures are always scoped to a partition key. Items that have a different partition key value will not be visible to the stored procedure. 
- This also applied to triggers as well.
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

  ```
### `SQL API` Insertion rules {#notes}
- Partition and Unique key combination is unique
- `Partition Key and Unique key` combination is unique
    - Create a collection with Partition Key as `/name`
      ```bash
      az cosmosdb mongodb collection create \
          --account-name lab-mongo \
          --database-name sqlcoll \
          --name collinsert -g lab \
          --shard "name"
      ```
        - Parameters {#parameters}
            - `shard` - Partition Key
    
    - Insert below document `without Partition Key`
      ```json
      {
        "id" : "1",
        "category" : "test"
      }
      ```
    - Try Inserting another document `without Partition Key`
        - `Success` - No error for duplicate blank record for Partition Key `name` for `different Id` 
          ```json
          {
            "id" : "12",
            "category" : "test-2"
          }
          ```
    - Try Inserting another document `without Partition Key` but same Id
        - `Error` - Not allowed
          ```json
          {
            "id" : "1",
            "category" : "test-2"
          }
          ```
      
### Insertion Rules for `Mongo API` {#notes}
- Record cannot be inserted `without Partition key value` (applicable only for Mongo API)
    - Create a collection with Partition Key as `/id`
      ```bash
      az cosmosdb mongodb collection create \
          --account-name lab-mongo \
          --database-name inserttest \
          --name collinsert -g lab \
          --shard "id"
      ```
        - Parameters
          - `shard` - Partition Key
    
    - Insert below document
      ```json
      {
        "id" : "1",
        "category" : "test",
        "name" : "record-first"
      }
      ```
    - Try Inserting another document with same `id`
      ```json
      {
        "id" : "1",
        "category" : "test-2",
        "name" : "record-second"
      }
      ```
    - Try Inserting another document without value for `id`
        - `Error` - Cannot insert record without providing value for `Partition Key`
          ```json
          {
            "category" : "test-3",
            "name" : "record-third"
          }
          ```


---

# References
- [Pre Triggers](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/how-to-write-stored-procedures-triggers-udfs?tabs=javascript#pre-triggers)