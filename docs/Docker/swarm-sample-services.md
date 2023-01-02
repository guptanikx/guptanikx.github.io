---
title: "Docker Swarm Example Services"
date: "2021-03-21"
categories: 
  - "docker swarm"
tags: 
  - "containers"
---

### Setup Swarm with 2 Nodes
- Create Virtual Machine using VMWare Workstation in Bridge or NAT mode and Install Ubuntu
- Install docker and clone the Virtual Machine
- Note down the IP Address of the Virtual machine you want to be the master node
- Run Below Command in Virtual Machine Initialize Swarm and make this machine as master node 
```bash
docker swarm init --advertise-addr 192.168.29.46
```

- On executng above command you will receive a Token which can be used to jin the Swarm you have initalized
- Run below command on Second virtual machine to join as worker node in Swarm cluster.
  - `Note` the command below mentions the Master node IP address which we used earlier
```bash
docker swarm join --token SWMTKN-1-53tgcfdo1rta1vhg2h5uan52jx8kjh7pgqlf9sur2wh898829e-0evpkeinysyrw6yy8qcw7dj0e 192.168.29.46:2377
```
- Get the status of the swarm. you will get the response similar to the one provided below
	```bash
	docker node ls
	```
	- Response
	```bash
	ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION 
	qgorb1tqqgz1yay451p289bto     ubuntu     Ready     Active                          20.10.5 
	rboqth5dooufv0yrdh4sjb414 *   ubuntu     Ready     Active         Leader           20.10.5
	```

### Create Service Stack
- Define a file [stack.yaml](https://github.com/guptanikx/docker-hack/blob/main/mysql_with_adminer.yaml) with below definition of MySQL db and MySQL db manager 
- There are two services defined in above YAML
- One is MySQL database container and another is adminer portal for managing MySQLdb
- Deploy the Stack on the master node.
```bash
docker stack deploy -c stack.yml mysql
```				
- Verify deployed containers in Master node. Response will be similar to provided as below
	```bash
	docker service ls
	```
	- Response
	```bash
	ID             NAME            MODE         REPLICAS   IMAGE          PORTS
	pvdddry3q7aw   jolly_feistel   replicated   2/2        nginx:latest   *:30000->80/tcp
	```
- Verify deployed containers in worker node. As we have set Replicas as 2 it will deploy another container in Worker nodes
- In worker nodes w cannot execute swarm command but we can see the containers executing
- Observe the names of the container in both master and worker nodes
	```bash
	docker container ls
	```
	- Response
	```bash
	CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS          PORTS                    NAMES 
	b9e7e719d5b8   nginx:latest          "/docker-entrypoint"   40 minutes ago   Up 40 minutes   80/tcp                   jolly_feistel.1.roztv54e8w6bjotwqoj8tpf7y
	```
### Docker Swarm Commands
  - Remove all containers in a node
  - This action will leave the node in drain state until you make it active again
	```bash
	docker node update --availability drain <node id>
	```
  - This action will make the node active again
	```bash
	docker node update --availability active <node id>
	```
  - Scale Service Instances
	```bash
	docker service scale <service name> = 3
	```
  - Remove current Leader node so that another node can be selected as Leader
	```bash
	docker node demote <node id>
	```

### Docker Swarm UI
- Launch container for Swarm UI
```bash
docker run -it --rm --name swarmpit-installer --volume /var/run/docker.sock:/var/run/docker.sock swarmpit/install:1.8
```

---

### References
- The Docker Workshop book.
- [Docker Swarmpit UI](https://swarmpit.io/)
