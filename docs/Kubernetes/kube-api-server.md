---
title: "Kubernetes Kube API Server"
categories: 
  - "kuberenetes"
tags: 
  - "containers"
---

### Kube API Server Request Flow
    ![](/assets/images/kube_10-768x271.png)

- ### Authentication
  - Each call through Kube API Server has to be authenticated through one of the supported Authenticated plugins as per the user type
  - Example
    - For Service Accounts it uses module ServiceAccountTokens
  - Types of Authentication Supported
      - Client Certificates
      - Service Account Bearer Tokens
      - Authenticating Proxy
      - HTTP Basic Auth

- ### Authorization
  - After Authentication API server verifies the privileges of the incoming user for the operation being requested

- ### Admission Controls
  - Admission controls stage is used for CRUD operations other than Read operations

- ### Validation
  - After API server validates the object it stores the object in the etcd datastore

- ### Kube APi Versions with Scope and Kind
  ```bash
  kubectl api-resources
  ```
  - Response
    ```bash
    ```

- ### API Server Manifest file location to update configuration
```bash
sudo vi /etc/kubernetes/manifests/kube-apiserver.yaml
```				

- To access API Server from Postman or Curl, it is advisable to run Proxy server first. Proxy server can take care of Authenticatio on user behalf
- To start the proxy server enter the below command
```bash
kubectl proxy 
// With Custom port 
kubectl proxy --port=9100 
// Run in background 
kubectl proxy &							
```

- Now we can acess the above Url to create a simple Http Request to Kube API Server
- Example below command get alll pods information
```bash
curl  http://localhost:8001/api/v1/pods
```

- ### Using Certificate Authentication with Kube API Server
  - To access API Server without Proxy we need to pass Client Certificate details to the tool
  - Get Kube server authentication details from below command
    ```bash
    cat ~/.kube/config
    ```			
  - Note down below values from above config
      - server
      - client-certificate
      - client-key
      - certificate-authority
  - We can use above values in CURL to access Kube Server API's
    ```bash
    curl --cert /home/nikx/.minikube/profiles/minikube/client.crt --key /home/nikx/.minikube/profiles/minikube/client.key --cacert /home/nikx/.minikube/ca.crt https://192.168.49.2:8443/api/v1/pods
    ```

- ### Using Mounts to access API Server credentials
  - By default when POD is created secrets volume is mounted to the POD in location `/run/secrets/kubernetes.io/serviceaccount`
  - The secrets in mounted volume are in plain text and not Base64 decoded. Below types can be read from mount folder
      - namespace
      - token
      - ca.crt

---
