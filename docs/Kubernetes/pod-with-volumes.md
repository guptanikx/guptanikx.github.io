---
title: "POD with Volumes"
date: "2021-04-17"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
---

### Types of Volumes (See Reference)

### Using Emptydir Volume
- [YAML with Empty Dir](https://github.com/guptanikx/learn-kube/blob/main/app-empty-dir.yaml)
			
- Parameters
    - `volumeMounts` - should be defined seperately for each container inside one pod
        - `mountPath`
            - Each container can mount same volume on different paths
        - `subPath`
            - Mounr folder instead of whole volume
        - `readOnly`
            - Makes mounted path readOnly

### Using Persistent Volume Claim
- [YAML with persistent PVC](https://github.com/guptanikx/learn-kube/blob/main/app-presistent-pvc.yaml)

---

### References
- [Type of Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)
- [Persistent Volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Storage Class](https://kubernetes.io/docs/concepts/storage/storage-classes/)
