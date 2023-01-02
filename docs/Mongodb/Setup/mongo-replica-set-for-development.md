---
title: "Create Mongo Replica Set For Development"
date: "2021-04-03"
categories: 
  - "mongodb"
tags: 
  - "mongo"
---

- Install Mongod
  - Install mongod on three linux virtual machines
  - Run below command on each of three nodes
	```bash
	sudo apt install mongodb-org
	```
  - Do not start the mongod service
  - Check the status and stop the service if already started
	```bash
	sudo service mongod status 
	sudo service mongod stop
	```
- Update Local Nameservers
  - We need to add the three nodes to local nameserver file for easy dns name resolution while joining replicas
  - Add below lines to `/etc/hosts` file in each of the three nodes
  - Replace Ip address with actual ipaddress of each virtual machine
	```text
	192.168.118.128 mongo02 
	192.168.118.129 mongo01
	192.168.118.130 mongo03
	```			
- Start Mongod Service
	- Before starting Mongod service we need to create few directories for each Replica Set in every node
	```bash
	mkdir -p /srv/mongodb/rs0-0  /srv/mongodb/rs0-1 /srv/mongodb/rs0-2
	```
- Start Mongod service on each instance explicitly
	```bash
	mongod --replSet rs0 --port 27017 --bind_ip 0.0.0.0 --dbpath /srv
	mongodb/rs0-0  --oplogSize 128 

	mongod --replSet rs0 --port 27018 --bind_ip 0.0.0.0  --dbpath /srv
	mongodb/rs0-1  --oplogSize 128 
	
	mongod --replSet rs0 --port 27019 --bind_ip 0.0.0.0 --dbpath /srv
	mongodb/rs0-2 --oplogSize 128
	```

- Verify on each node you are able to connect to the replica node
```bash
mongo --host mongo01 
mongo --host mongo02 
mongo --host mongo03
```

- Start mongoshell on node which you want to be primary and enter the below replica set config
- It is advisable to consider the node which is running using port 27017 as Primary node
```bash
`mongo`> rsconf = {   _id: "rs0",   members: [     {      _id: 0,      host: "mongo01:27017"     },     {      _id: 1,      host: "mongo02:27018"     },     {      _id: 2,      host: "mongo03:27019"     }    ] }
```

- Notice that the shell initial will change as `rs0:Primary`
- In same mongo shell instance initialize Replica Set passing above configuration
```bash
rs0:Primary> rs.initiate(rsconf)
```
- Display the current configuration we just applied to verify
```bash
rs0:Primary> rs.conf()
```
- Now the Replica Set is ready and you can Verify the connectivity using Mongodb Compass

---

### References
- [Mongodb Official](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/)
