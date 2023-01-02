---
title: "Create POD with Custom Commands"
date: "2021-03-29"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
  - "custom command"
---

- Create Deployment YAML
  - Create a file named [pod-custom-command.yaml](https://github.com/guptanikx/learn-kube/blob/main/pod-custom-command.yaml) with below contents
  - Apply manifest
  ```bash
  kubectl apply -f pod-custom-command.yaml
  ```				

  - When manifest changes are applied and there is no `Deployment` kind in manifest only API object is created without any deployment group
