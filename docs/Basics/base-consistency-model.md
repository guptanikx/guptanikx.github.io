---
title: "BASE Consistency Model"
date: "2021-03-13"
categories: 
  - "patterns"
tags: 
  - "consistency-models"
---

##### Basic Availability

- The data is available for the majority of time
- It places importance on Availability rather than cosistency and performance.

##### Soft State

- The data store does not need to be write consistent. Most of the data sources today can suffer a loss of delay in data getting updated.
- Soft state ensures replicas are in soft state that means, the data changes are recorded and propogated across replicas but there mightbe a delay and it doesnt stop the data from being updated.
- This means the data can be updated parallely as long as the soft state is written and propogated properly.

##### Eventual Consistency

- As w mentioned earlier soft states are maintained and data is not locked. So master data and its replicas attain a state of consistency eventually after some time.

- Used majorly in NoSQL databases, Shards concepts, key value databases etc.
