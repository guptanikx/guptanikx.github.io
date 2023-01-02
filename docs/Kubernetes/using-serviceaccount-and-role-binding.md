---
title: "Deploy WebApp using ServiceAccount and new Namespace"
date: "2021-03-29"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
  - "service account"
---

- Create new namespace named `redis`
```bash
kubectl create namespace redis
```				
- Deploy the Redis WebApp inside new namespace `redis`
```bash
kubectl apply -f redis-app-deploy.yaml -n redis
```				
- When application is deployed expose the `redis-app-service` to connect to UI
```bash
minikube service redis-app-service
```				
- Browse the Url returned by Minikube or Kubernetes deployment and hit `Home/Pods/pods` method
- Example `http://192.168.49.2:31269/index.html`
```bash
minikube service redis-app-service -n redis
```				

- You will receive the below response.
- The `/Home/PodsForCurrentNamespace/PodsForCurrentNamespace` endpoint is try to access the Pods for current namespace (in our case redis) and is thus throwing the error as the provided token doesnt have access to cluster level role
- [Know more about access tokens in Pod](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/kuberenetes/2021/03/28/kubernetes-kube-api-server/) 
```json
{
	"kind": "Status",
	"apiVersion": "v1",
	"metadata": {},
	"status": "Failure",
	"message": "pods is forbidden: User system: serviceaccount: redis: default cannot list resource 
				pods in API group at the cluster scope",
	"reason": "Forbidden",
	"details": {
		"kind": "pods"
	},
	"code": 403
}`
				
### Create and Bind Role

- Create a new Role with access to the Pods API for current namespace in our case `redis` to access Pods info
- We are creating a new Rolebinding with name `redis-view`
- This Role will have `View` permissions on ClusterLevel defined by `--clusterrole`
- `--serviceaccount` - in format <namespace name>: <service account name>
- `--namespace` = redis for our case.
- This means the role can read cluster level info for current namespace
```bash
kubectl create rolebinding redis-view --clusterrole=view --serviceaccount=redis:default --namespace=redis
```
- Now again hit the Endpoint `/Home/PodsForCurrentNamespace/PodsForCurrentNamespace` and now it should be able to return the pods info.
