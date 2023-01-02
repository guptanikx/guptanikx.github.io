---
title: "DevOps Triggers"
date: "2021-03-12"
categories: 
  - "azure-devops"
tags: 
  - "devops"
---

1. Include
    
    ```yml
    trigger:
        branches:
            include:
            - master
            - main
        paths:
            include:
            - src
    ```
    
2. Exclude
    
    ```yml
    trigger:
        paths:
            exclude:
            - /data
    ```
    
---

### References
