---
title: Docker - Commands
---

- All Running Containers
```bash
docker ps -a
```
	- ##### Response
	```text
	CONTAINER ID   IMAGE         COMMAND       CREATED        STATUS                    PORTS     NAMES
	4a25dd4a4066   ubuntu        "/bin/bash"   15 hours ago   Up 15 hours                         ubuntu
	c70ec89bf8c6   hello-world   "/hello"      15 hours ago   Exited (0) 15 hours ago             hello
	```
  
- All Running Container Id's
```bash
docker ps -aq
docker container ls -a
```
	- ##### Response
	```text
	4a25dd4a4066
	c70ec89bf8c6
	```
		
- Remove all running containers
```bash
docker rm -f $(docker ps -aq)
```

- To exit the container without stopping it `Ctrl+P Ctrl+Q`
  
- Provide Environment variables to container
```bash
docker exec -it -e VAR_NAME=VAR_VALUE <container name> /bin/sh
# echo $VAR_NAME
# exit
```

- Command `exec` is used to run commands in `running` container
```bash
docker exec -it <container name> /bin/sh
# echo $VAR_NAME
# exit
```

- See running container as process in host machine 
  - Get container id for running container
    ```bash
    docker inspect <container name> -f "{{json .Id}}"
    ```

  - List all running process in a hierarchy
    ```bash
	ps -aef --forest | grep containerd
	```
	![Center_300](/assets/images/docker_03_ps_aef.PNG)

    - Response (observer highlighted text)
        - PID `978 is parent containerd` process
        - PID `4881` is containerd-shim process managed by above PID


### Logs
- See `tail` logs. Needs to run again for latest logs
```bash
docker container logs --tail 5 nginx
```
- See continuous log stream with tail logs using `follow`
```bash
docker container logs --tail 5 --follow nginx
```
- Logging Drivers
  - `docker container logs` command is only available for `json-file` and `journald` drivers
  
    ```text
    Driver	  |   Description
    none        |   No log output for the specific container is produced.
    json-file   |   This is the default driver. The logging information is stored in files, formatted as JSON.
    journald    |   If the journals daemon is running on the host machine, we can use this driver. It forwards logging to the journald daemon.
    syslog      |   If the syslog daemon is running on the host machine, we can configure this driver, which will forward the log messages to the syslog daemon.
    gelf        |   When using this driver, log messages are written to a Graylog Extended Log Format (GELF) endpoint. Popular examples of such endpoints are Graylog and Logstash.
    fluentd     |   Assuming that the fluentd daemon is installed on the host system, this driver writes log messages to it.
    
    ```

  - Change Logging driver
    ```bash
    docker container run --name nginx -d -p:8080:80 --log-driver json-file nginx 
    ```
