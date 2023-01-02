---
title: "POD with Multiple Containers"
date: "2021-03-29"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
  - "multi containers"
---

### Create Deployment YAML
- Create a file named `pod-multi-container.yaml` with below contents
- [See YAML](https://github.com/guptanikx/learn-kube/blob/main/multi-container-pod.yaml)
				
- Apply manifest
```bash
kubectl apply -f pod-multi-container.yaml
```

- Note we have used `Named ports` in manifest file so that we can forward different ports using port names
```bash
kubectl port-forward pod/pod-multi-container nginx-port 9100:80
```
```bash
kubectl port-forward pod/pod-multi-container redis-port 9200:6379
```

- See Logs for Respective containers
```bash
kubectl logs -f pod/pod-multi-container container-nginx
```
```bash
kubectl logs -f pod/pod-multi-container container-redis
```
