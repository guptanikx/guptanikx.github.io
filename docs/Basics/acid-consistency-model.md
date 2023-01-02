---
title: "ACID Consistency Model"
date: "2021-03-13"
categories: 
  - "patterns"
tags: 
  - "consistency-models"
---

##### Atomicity

- An operation is considered Atomic when the transaction performed by operation either succeed or fails.
- If operation has multiple transactions, it will be called atomic when all the transactions either succeed or fail collectively.

##### Consistency

- After each transaction the the datastore is structurally sound and consistent

##### Isolation

- Each transaction in operation should work in isolation without any shared resources and without any contention of resources.
- Isolation gurantess no two transactions can occur simultaneously

##### Durability

- After a transaction is completed the target database should be in consistent state and changes are permanent even there is power failure

- Disadvantages
    -  All factors collectively cannot be acheived when data is replicated or partitioned across regions and locations.

This is the reason in modern data systems where availability and performance are primary conerns ACID model is not used, but BASE
