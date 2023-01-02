---
title: "Kubectl The Kubernetes Commander"
date: "2021-03-27"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
---

### Architecture
![](/assets/images/kube_03-768x514.png)

- Setup bash Auto Completion
```bash
sudo apt-get install bash-completion source <(kubectl completion bash)
```				

- You can add alias for kubectl commands in .bashrc fileÂ 
```bash
alias kcdp='kubectl describe po' alias kcds='kubectl describe svc' alias kcdd='kubectl describe deploy'
```

- See default kubectl config in `$HOME/.kube/config`
```bash
kubectl config view
```				

- Context in config is the information required to access the cluster
	- By default all core components are deployed in `kube-system` namespace

### CRUD Operations
- As everything is an API object in kubernetes, kubectl provides way of doing operations on these objects.
    - `get <object>`
        - Example - kubectl get pod
    - `describe <object-type> <object-name>`
        - Example - kubectl describe pod mongo-pod
    - `logs <object-name>`
        - Example - kubectl logs mongo-pod
    - `edit <object-type> <object-name>`
        - Example - kubectl edit pod mongo-app
    - `delete <object-type> <object-name>`
        - Example - kubectl delete pod mongo-app
    - `create <filename.yaml>` - Creates multiple/single objects as defined in YAML
        - Example - kubectl create -f mongo-app-deploy.yaml
    - `apply <filename.yaml>` - Create or update multiple/single objects as defined in YAML
        - Example - kubectl apply -f mongo-app-deploy.yaml

- Rollback Deployment
```bash
kubectl rollout undo deployments #deployment-name
```				

- Rollback Deployment from History
```bash
kubectl rollout undo deployments $deploymentName
	--to-revision=$revisionNumber
```				

- Get YAML manifest from deployment
```bash
kubectl get deploy <deployment name> -o yaml > manifest.yaml
```	

- Create simple deployment with Image 
```bash
kubectl create deployment redisdeploy --image=redis
```

- Create deployment with replicas 
```bash
kubectl run redisdeploy --image=redis --replicas=3
```				

### Commands

- Common Flags
    - `--all-namespaces`
        - Get specified object in all namespaces
    - `-o wide`
        - Display mode attributes/info about specified resource

- Config
    - Change namespace to custom-namespace 
    ```bash
    kubectl config set-context $(kubectl config current-context) --namespace custom-namespace
    ```

- Deployments
    - Get all deployments in current namespace
    ```bash
    kubectl get deployments
    ```
    - Get all deployments in All namespaces
    ```bash
    kubectl get deployments --all-namespaces
    ``` 
    - Get all deployments in proivded namespace 
    ```bash
    kubectl get deployments -n <namespace name>
    ```
- Pods
    - Get all pods in current namespace
    ```bash
    kubectl get pods
    ```
    - Get all pods with all labels
    ```bash
    kubectl get pods --show-labels
    ```
	- Get more information about pods 
    ```bash
    kubectl get pods -o wide
	```			
    - Get labels filter in shorthand 
    ```bash
    kubectl get pods -l app=redis-app
	```			
    - Add column 'tier' to the output 
    ```bash
    kubectl get pods -l app=redis-app -L tier
    ```
- Label Selectors
    - Get node with label env not equal to dev
    ```bash
    kubectl get node -l env!=dev
    ```
    - Get node with label env in dev,qa
    ```bash
    kubectl get node -l 'env in (dev,qa)'
    ```
    - Get node with multiple label selectors 
    ```bash
    kubectl get node -l 'cpu=2,env in (dev,qa)'
    ```
