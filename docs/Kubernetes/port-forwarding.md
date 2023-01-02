---
title: "Exposing Container PORT using Port Forwarding"
date: "2021-03-29"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
---

- Create a file named [pod-port-expose.yaml](https://github.com/guptanikx/learn-kube/blob/main/pod-port-expose.yaml) with below contents
- Apply manifest
```bash
kubectl apply -f pod-port-expose.yaml
```
- Forward Traffic from Local port 9100 to Container port 80
```bash
kubectl port-forward pod/pod-port-expose 9100:80
```

---

