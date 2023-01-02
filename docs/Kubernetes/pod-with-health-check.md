---
title: "POD With Health Check"
date: "2021-03-29"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
  - "config"
---

### Create Deployment YAML
- Create a file named [pod-health-probe.yaml](https://github.com/guptanikx/learn-kube/blob/main/pod-health-probe.yaml) with below contents
  
- Apply manifest
```bash
kubectl apply -f pod-health-probe.yaml
```
- Verify Health Probes
```bash
kubectl describe pod/pod-health-probe
```

![](/assets/images/kube_15.png)

---

### References
