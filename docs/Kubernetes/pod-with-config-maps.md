---
title: "POD with Config Maps"
date: "2021-04-18"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
  - "config"
---

### Create ConfigMap and Assign to Pod
- [Sample Kube-app with ConfigMap](https://github.com/guptanikx/learn-kube/blob/main/config-map.yml)
  - Parameters
      - `envFrom`
          - Load all environment variables declared in config map
      - `valueFrom`
          - Refer single named key from ConfigMap

- [Using Persistent Volume Claim](https://github.com/guptanikx/learn-kube/blob/main/pvc-config-map.yml)

---

### References
- [ConfigMaps](https://kubernetes.io/docs/tasks/configmap-secret/)
