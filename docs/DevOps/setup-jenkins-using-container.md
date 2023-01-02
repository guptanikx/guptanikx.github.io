---
title: "Setup Jenkins using Container"
date: "2021-03-21"
categories: 
  - "jenkins"
tags: 
  - "containers"
  - "devops-tools"
---

#### Setup Environment

- It is preferred to run jenkins in a individual Virtual machine as the state will need to be persisted. If you use same machine as for other docker samples than you might have to setup Jenkins again and again
- Create a Virtual Machine and [install docker](https://docs.docker.com/docker-for-windows/install/)

#### Setup Jenkins using Docker

- Pull Jenkins Blueocean container image and create container

				
					`docker run -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkinsci/blueocean`
				

- Get the machine IP address and browse the url similar to http://192.168.29.76:8080
- You will be prompted for a login page asking for password
- To get the password we need to check the container logs for jenkins container

				
					`docker container logs -f jenkins`
				

![](/assets/images/Jenkins_Logs_01.png)

- Select Install suggested plugins. Then, click Skip and continue as admin. Click Save and Finish

![](/assets/images/Jenkins_Logs_02.png)

- let Jenkins Install Plugins as it will take some time.
- After the plugin setup is completed you will be prompted to create First Admin User. This step is optional but it is advisable to create.
- Below screen will come which means Jenkins setup has completed and we can start creating Pipeline.

![](/assets/images/Jenkins_Logs_03.png)

##### Add Docker permissions to Jenkins user

- To execute docker commands we need to add Jenkins user to docker group
- If not already exists, add a Jenkins user to the docker host

				
					`sudo useradd jenkins`
				

- Add the Jenkins user to the docker group

				
					`sudo usermod -aG docker jenkins`
				

- Obtain the docker group ID from /etc/group that is, 998

				
					`sudo cat /etc/group | grep docker`
				

- Use docker exec command to create a bash shell in the running Jenkins container

				
					`docker exec -it -u root jenkins /bin/bash`
				

- Edit the /etc/group file inside the Jenkins container

				
					`vi /etc/group`
				

- Replace the docker group ID with the ID obtained from the host, and add the Jenkins user to the docker group

				
					`docker:x:998:jenkins`
				

- Save the /etc/group file and close the editor

				
					`:wq`
				

- Exit from the Jenkins container and Restart Jenkins container

				
					`docker container stop jenkins docker container start jenkins`
				

##### Setup SSH for Git Repo in Jenkins Container

- You will require this step if your repo has submodules in it.
- Copy the contents of `.ssh` folder to Jenkins container so that Jenkins can pull your repos using SSH keys

				
					`docker cp . jenkins:/var/jenkins_home/.ssh/`
				

#### Deploy Applications using Jenkins

- [Deploy AspNetCore application to docker](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/devops/jenkins/2021/03/21/deploy-aspnetcore-app-in-docker-using-jenkins/)

#### References

- [Jenkins Blue Ocean in Container](https://www.jenkins.io/doc/book/installing/docker/#accessing-the-jenkins-blue-ocean-docker-container)
- The Docker Workshop book.
