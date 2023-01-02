---
title: "POD With Label Selector"
date: "2021-03-30"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
---

### Modify Labels on Nodes
- Start Minikube with at least 3 nodes
```bash
minikube start -n=3
```

- As minikube names the nodes serially generally the second node will have name minikube-m02. Before proceeding check and replace the node name if different in your system
- We will check the existing Labels on second Node
```bash
kubectl describe node minikube-m02
```
```bash
Name:               minikube-m02 
Roles:              <none> 
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux                     kubernetes.io/arch=amd64                     kubernetes.io/hostname=minikube-m02 
					kubernetes.io/os=linux 
```

- Now, we will add the below labels to the node where we will deploy the sample pod
```bash
kubectl label node minikube-m02 env=dev
```				

### Create Deployment YAML
- Create a file named [pod-label-selector.yaml](https://github.com/guptanikx/learn-kube/blob/main/node-label-selector.yaml) 

- Apply manifest
```bash
kubectl apply -f pod-label-selector.yaml
```
- Verify the node is deployed on node with label env=dev
```bash
kubectl describe pod/pod-label-selector
```

![](/assets/images/kube_16-768x128.png)

- Delete the label we applied on Node
```bash
kubectl label node minikube-m02 env-
```
