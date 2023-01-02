---
title: "Kubernetes Info"
date: "2021-03-27"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
---

### Architecture

![](/assets/images/kube_01-768x491.jpg)

### Traffic Routing

- Routing traffic from user outside the container to the pod running the application

![](/assets/images/kube_02-768x186.jpg)

### Components Spec

- [Complete Pod Spec](https://pkg.go.dev/k8s.io/api/core/v1#PodSpec)

### Components
- Higher Level Constructs
    - Replica Set & Replication Controller
        - Auto Healing and Scaling Capabilities
    - Deployment
        - Versioning and Rollback
    - Service
        - IP Address and NetworkingÂ 
        - Act as connector to map the extrnal requests to the destination pods so that the pods can be accessed from outside the cluster
    - Volume
        - Non Ephemeral Storage for Pods
- Pods  
    - Consist of 1 or more containers
    - All containers share same memory, storage and Cpu
    - Are AtomicÂ  in nature
        - Either all containers in a pod are deployed or none of them is
        - All containers of a Pod are deployed in same NodeÂ 

### Securing Communication
- Apiserver -> kubelet
    - Not Secure by default
    - To harden use
        - set-kubelet-certificate-authroity
        - SSH tunneling
- Apiserver -> Node/Pods/Services
    - Be defaults it is plain Http and without Encryption and AuthenticationÂ 
    - Use SSH Tunneling
