---
title: "Setup SonarQube"
date: "2021-03-24"
categories: 
  - "code-analysis"
tags: 
  - "codeanalysis"
  - "devops"
---

#### Setup SonarQube in Container

- Create Volume for persising SonarQube data

				
					`docker volume create --name sonarqube_data docker volume create --name sonarqube_logs docker volume create --name sonarqube_extensions`
				

- Run container with SonarQube image

				
					`docker run -d --name sonarqube          -p 9000:9000          -v sonarqube_data:/opt/sonarqube/data          -v sonarqube_extensions:/opt/sonarqube/extensions          -v sonarqube_logs:/opt/sonarqube/logs` 
				

#### References

- [SonarQube Install](https://docs.sonarqube.org/latest/setup/install-server/)
- [SonarQube DockerHub](https://hub.docker.com/_/sonarqube)
