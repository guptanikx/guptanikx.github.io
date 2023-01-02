---
title: "Docker Important Commands"
date: "2021-03-16"
categories: 
  - "docker"
tags: 
  - "containers"
---

- Run a container which will generate quotes before some of below commands - Refer [Run quotes Container]()
- #### Execute command in running container
  ```bash
  docker container exec -i -t quotes /bin/sh
  ```
    - Parameters
      - `exec`\- execute command in running container
      - `-i` - Interactive mode
      - `-t`\- Provides TTY terminal for the commands
      - `/bin/sh` - command to execute. This will open shell terminal inside docker container

  - If `-it` is not used the container will execute the provided command and return to the main shell.
- #### Pass Environment Variables to docker container
  - A We will pass environment variable to container an verify. We will use simple alpine container for this.
  ```bash
  docker run --name test-env -it -e ENV_HOSTNAME=nikx alpine /bin/sh / 
  ``` 
    - Parameters
      - `-e` - Provide comma seperated Environment Variables
      - `echo $ENV_HOSTNAME` - Command running inside contaner to print provided Environment Variable

- #### Run a Nginx server and map to Host port
  ```bash
  docker run  --name nginx -d -p 9000:80 nginx:alpine
  ```
    - Parameters
      - `-p HOST_PORT:CONTAINER_PORT` - Maps Host port 9000 to container port 80, as by default nginx launches sample html page on port 80

  - Override Entrypoint defined in Dockerfile
  - Nginx entrypoint by default starts the nginx server on container port 80
  - We can override the entrypoint of container image with custom entrypoint commandÂ 
  ```bash
  docker run --rm -it --name nginx --entrypoint /bin/sh nginx
  ```
    - Parameters
      - `--rm`
          - Remove the existing container with the same name if exists. This is very helpful otherwise you have to run mulitple commands to stop and remove the existing container
      - `--entrypoint`
          - Provides the custom command which will override the entrypoint defined in container image

- #### Login into Custom Docker registry
  ```bash
  docker login -u nikxlab -p ENdQdtRO8MC+Hdd9F9EQMNDjULxSBlYM nikxlab.azurecr.io
  ```
  - Attaching running container
    - Pressing Ctrl + c will stop the container docker container attach nginx 
    - Pressing Ctrl+c will not stop the container 
      ```bash
    docker container attach --sig-proxy=false nginx
    ```
- #### Execute command in Running container
  ```bash
  docker container exec nginx cat /etc/debian_version 
  ```
  - Run Interactively 
  ```bash
  docker container exec -it nginx /bin/bash
  ```				

### Logs
- Tail Logs
```bash
docker container logs --tail 10 mongo-dotnet
```
- Follow Logs
```bash
docker container logs -f mongo-dotnet
```
- Filter Logs from Date Time
```bash
docker container logs --since 2021-03-20 mongo-dotnet
```				
- Show Timestamp in container logs output
```bash
docker container logs --since 2021-03-20 -t mongo-dotnet
```

### Monitoring
- Container Live Stats
```bash
docker container stats mongo-dotnet
```				
- Docker Events
	- Docker events capture all events related to daemon api
	- Run below command in one terminal window and let it execute
	```bash
	docker events
	```
- Open a new Terminal and create a sample container and observe the previous terminal
```bash
docker run -d --name sample ubuntu
```				

### Quota
- Set Memory & CPU Limits
```bash
docker container run -d --name mongo-dotnet --cpu-shares 512 --memory 512M -p 8081:80 mongo-dotnet
```
- Time Docker Builds
- Print time taken to build a docker image
```bash
time docker build -t mongo-dotnet .
```				

### Networking
- #### Run Two Containers in same network
  - Launch Redis Container in a network named `redis-network`
  - Redis expose deault port at 6379 and as this container is going to be used from inside network we are not mapping the port to host
  ```bash
  docker container run -d --name redis --network redis-network redis:alpine
  ```				
  - Launch moby-counter app in same entwork
  ```bash
  docker container run -d --name moby-counter -p:8080:80 --network redis-network russmckendrick/moby-counter
  ```				
  - Create Network with Subnet
  - The new network api allowd bi-directional comunication as opposed to legacy network api `--link` which was unidirectional
  - The new network is created with `bridge` type unless specified otherwise
  - docker will also create new bridge network in the host machine. verify with `ifconfig` in Linux and `ipconfig` in Windows
  ```bash
  docker network create mongonet --subnet 192.168.54.0/24 --gateway 192.168.54.1
  ```
  - Launch containers in new network with alias names
  ```bash
  docker run -itd --network mongonet --network-alias alp1-net --name alp-1 alpine
  ```
  ```bash
  docker run -itd --network mongonet --network-alias alp2-net --name alp-2 alpine
  ```
  - Exec ping command in alp-1 container to alp-2
  ```bash
  docker exec alp-1 ping alp-2
  ```

### Volumes
- #### Mount Volume to Container
  - Create a simple Volume in host
  ```bash
  docker volume create mysql_vol
  ```
  - Mount Volume to Container
  ```bash
  docker container run -it -v mysql_vol:/data --name mysql_container mysql
  ```
    - Parameters
      - `-v`
        - Volume mapping from Host Volume name to Volume path inside container HOST VOLUME NAME : CONTAINER FOLDER PATH
        - We can acess any file inside container using path as`/data/my_file.txt`

- #### Share Volume between Containers
  - Create a container with Volume that is not shared with the Host or mounted in Host and open interactive terminal in container
  ```bash
  docker container run -v /shared_vol --name app1 -it ubuntu /bin/bash
  ```
  - Create a new file in the volume from inside container `app1`
  ```bash
  echo sample file data >> /shared_vol/shared_file.txt
  ```
  - Create a second container `app2` with Volume which is inside container `app1` using flag `--volumes-from`
  ```bash
  docker container run --volumes-from app1 --name app2 -it ubuntu /bin/bash
  ```
  - Verify we can access the `shared_file.txt` from second container
  ```bash
  cat /shared_vol/shared_file.txt
  ```

---

### References
- [Dockerfile Commands](/docker/2021/03/17/understanding-dockerfile/)
