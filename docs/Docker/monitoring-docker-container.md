---
title: "Control Docker Container Resource Usage"
date: "2021-03-25"
categories: 
  - "docker"
tags:
  - "containers"
---

- ### Manage Container CPU Resources
- Print container CPU stats in Table Format
```bash
docker stats --format "table \{\{.Name}}t\{\{.Container}}t\{\{.CPUPerc}}"
```				

- Limit Container CPU
```bash
docker run --cpu 2
```				

- Limit Container Memory
	- Memory swap value should always be more than memory of the container
	```bash
	docker run --memory 512MB --memory-swap 1024MB
	```
- Limit Disk I/O in terms of Blocks
  - Value is relative weight for the container between 10 and 1000
	```bash
	docker run --blkio-weight <value> <docker-image>
	```			
- Limit Write in Bytes Per Second (bps)
```bash
docker run --device-write-bps <device>: 	<limit> <docker-image>
```				

- Limit Read in Bytes Per Second (bps)
```bash
docker run --device-read-bps <device>: 	<limit> <docker-image>
```				

---

### References
- [SonarQube Install](https://docs.sonarqube.org/latest/setup/install-server/)
- [SonarQube DockerHub](https://hub.docker.com/_/sonarqube)
