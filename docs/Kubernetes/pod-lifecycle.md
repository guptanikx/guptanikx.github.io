---
title: "Kubernetes Pod Lifecycle"
date: "2021-03-27"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
---

To understand the Pod Lifecycle we will turn off the Master plane components and then attempt to create a Pod. We will see the errors and step by step bring each component online to understand role of that component in Pod Lifecycle
{: .msg-info}

We cannot run any kubectl commands if kube-apiserver is stopped
{: .msg-info}

- [Follow steps to download and run Minikube](https://minikube.sigs.k8s.io/docs/start/)

- We will start two terminals
  - Host Terminal (Terminal on host machine where Minikube is running)
  - Minikube Terminal (using command `minikube ssh`

- Stop All Kube Services
  - Minikube Terminal
    - Stop the `kubectl` so that it is not able to start the service when we will stop them in next commands
	```bash
	sudo systemctl stop kubelet
	```				

- Stop other kube services like
	- Host Terminal	 
		- kube-scheduler
		- kube-controller-manager
		- kube-apiserver
		```bash
		docker stop $(docker ps | grep kube-scheduler | grep -v pause | awk '{print $1}') 
		docker stop $(docker ps | grep kube-controller-manager | grep -v pause | awk '{print $1}') 
		docker stop $(docker ps | grep kube-apiserver | grep -v pause | awk '{print $1}')`
		```				

- Try to Deploy sample application
	- Create Deployment manifest `mongo-app-deploy.yaml` and deploy sample mongo-app
```yaml
apiVersion: apps/v1 
kind: Deployment 
metadata:   
	name: mongo-app 
spec:   
	replicas: 1   
	selector:     
		matchLabels:       
			tier: frontend
	template:
		metadata:
			labels:
				tier: frontend
		spec:
			containers:
			- name: mongo-app
			  image: devignitelab.jfrog.io/labdocker/mongo-app:v2
			  env:
			  - name: ASPNETCORE_ENVIRONMENT
			  	value: DEV
			  - name: Mongodb_Connection
				value: "mongodb://192.168.118.129:27017"
			  ports:
			  - containerPort: 80`
```

- Try to Deploy the manifest using `kubectl`
```bash
kubectl apply -f mongo-app-deploy.yaml
```				

- The deployment will fail with below error as we have stopped kube-apiserver previously
```text
The connection to the server 192.168.49.2:8443 was refused - did you specify the right host or port?
```

- Minikube Terminal
  - Lets restart the kube-apiserver service container
```bash
docker start $(docker ps -a | grep kube-apiserver | grep -v pause | awk '{print $1}')
```				

- Host Terminal
	- Retry the deployment again and this time deployment should get created
    - Let's get the deployment we created to see if containers are scheduled
	```bash
	kubectl get deploy
	```

      - Response
		```bash
		NAME        READY   UP-TO-DATE   AVAILABLE   AGE 
		mongo-app   0/3     0            0           1s
		```

- The above response shows that though the deployment is created but no PODS are deployed which is visible by value of READY which is 0/3 

It is the role of kube-controller-manager to create the PODS as required by  deployment
{: .msg-info}

- Minikube Terminal
    - Let's start the `kube-controller-manager`
```bash
docker start $(docker ps -a | grep kube-controller-manager | grep -v pause | awk '{print $1}')
```

- Host Terminal
  - Get the Deployment status again
	```bash
	kubectl get deploy
	```
	- Response
	```bash
	NAME        READY   UP-TO-DATE   AVAILABLE   AGE 
	mongo-app   0/3     3            0           64s
	```

    - The above response now show UP-TO-DATE value as 3. This means POD have been created but the POD tasks are not yet deployed
    - It is the responsibility of kube-scheduler to deploy the code to the pod
	```bash
	kubectl get pod -o wide
	```
		- Response
		```bash
		NAME                         READY   STATUS    RESTARTS   AGE   IP       NODE     NOMINATED NODE   READINESS GATES
		mongo-app-75d8b97b9b-2hcxj   0/1     Pending   0          11m   <none>   <none>   <none>           <none> 
		mongo-app-75d8b97b9b-7pz74   0/1     Pending   0          11m   <none>   <none>   <none>           <none> 
		mongo-app-75d8b97b9b-qhtxf   0/1     Pending   0          11m   <none>   <none>   <none>           <none>
		```

- As suspected the PODS are created but in `Pending` state and there is no Node assigned to the PODS.
  
It is the responsibility of the kube-scheduler to assign the NODE to the PODS
{: .msg-info}

- Minikube Terminal
    - Let's start the `kube-scheduler`
	```bash
	docker start $(docker ps -a | grep kube-scheduler | grep -v pause | awk '{print $1}')
	```
- Host Terminal
    - Get the details for one of the PODS
	```bash
	kubectl describe pod mongo-app-75d8b97b9b-2hcxj
	```
	- Response
	```bash
	Events:   Type     Reason            Age    From               Message
	Warning  FailedScheduling  4m52s  default-scheduler  0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/unreachable: }, that the pod didn't tolerate.   
	Warning  FailedScheduling  4m52s  default-scheduler  0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/unreachable: }, that the pod didn't tolerate.
	```
				
- In Events section of the Response we are able to see the kube-scheduler is trying to schedule the POD but is failing
- The reason being we have stopped the `kubelet` service. As Minikube is single node cluster and we have stopped the kubelet service on it. Due to non availability of the Node with kubelet service the scheduler is not able to work properly
- Note that this problem is there as we are using test environment with single node. This problem cannot occur in production grade cluster as there will always be multiple nodes running

- Minikube Terminal
    - Let's start the kubelet service
	```bash
	sudo service kubelet start
	```			
- Host Terminal
    - Get the PODS list again
	```bash
	kubectl get pod -o wide
	```			
	- Response
	```bash
	NAME                         READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
	mongo-app-75d8b97b9b-2hcxj   1/1     Running   0          32m   172.17.0.7   minikube   <none>           <none> 
	mongo-app-75d8b97b9b-7pz74   1/1     Running   0          32m   172.17.0.6   minikube   <none>           <none> 
	mongo-app-75d8b97b9b-qhtxf   1/1     Running   0          32m   172.17.0.5   minikube   <none>           <none>
	```

- Now all PODS are scheduled and running

