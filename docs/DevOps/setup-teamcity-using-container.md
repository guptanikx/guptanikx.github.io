---
title: "Setup TeamCity using container"
date: "2021-03-22"
categories: 
  - "jenkins"
tags: 
  - "containers"
  - "devops-tools"
---

#### Setup Environment

- It is preferred to run TeamCity in a individual Virtual machine as the state will need to be persisted. If you use same machine as for other docker samples than you might have to setup Jenkins again and again
- Create a Virtual Machine and [install docker](https://docs.docker.com/docker-for-windows/install/)

#### Setup TeamCity

- Pull Teamcity Official image

				
					`docker pull jetbrains/teamcity-server`
				

- Create Volumes for Data and logs directory so that if container stops or kills we dont need to setup again

				
					`docker volume create team-city-data docker volume create team-city-logs`
				

- Run the TeamCity container

				
					`docker run -it --name team-city          -v team-city-data:/data/teamcity_server/datadir          -v team-city-logs:/opt/teamcity/logs          -p 8111:8111 jetbrains/teamcity-server`

				

- Get the machine IP address from `ifconfig` and browse the url similar to http://192.168.29.76:8111
- Choose the Internal database as we are not deploying a full fledge server.
- Setup is now complete for TeamCity server

##### Add TeamCity Agent with Docker build capability

- We will add agent which will have capability to build docker images or do docker deployments.
- Create docker volume for persisting Agent configuration so that we don't need to reconfigure it if container is killed.

				
					`docker volume create agent01`
				

- The agent itself will run inside docker. This means TeamCity agent will leverage Docker in Docker (Nested Virtualization) capability to run any docker based build steps.

				
					`docker run -it -e SERVER_URL="192.168.29.105:8111"  	    -e DOCKER_IN_DOCKER=start --privileged  	    -v agent01:/data/teamcity_agent/conf  	    --name agent01 jetbrains/teamcity-agent:2020.2.3-linux-sudo`
				

- Parameters
    - `SERVER_URL`
        - Team city Server url which we ran in previous step
    - `DOCKER_IN_DOCKER`
        - To enable docker related commands indie Team city agent container
    - `--privileged`
        - This falg is required otherwise docker service will not start inside container

- We are running Docker service inside team agent container as Privileged so as to prevent any docker command issues.
- We have used the `linux-sudo` image which is required for running docker based builds, but there are many predefined images available. Please follow link in References 
- Verify Team Agent is visible in TeamServer UI and Authorize the Agent to use it in TeamCity projects

![](/assets/images/TeamCity_01-768x400.png)

#### Configure Project from GitHub

- Click `Create Project` on Admin Dashboard
- Select Connections from Left Menu. Click `Add Connection` and Select `GitHub.com` in dropdown menu

![](/assets/images/TeamCity_02-768x415.png)

- Click on `Register TeamCity` in the popup and it will take yo to the Github OAuth Apps page. Follow the instructions in Popup and enter the information in OAuth app and click `Register Application`

![](/assets/images/TeamCity_03.png)

- Note the ClientID and Click on `Generate a new client secret`
- Enter both ClientID and Secret in TeamCity modal popup

![](/assets/images/TeamCity_04-768x462.png)

- Cick `Create Project` and select `From GitHub.com`
- As you have already registered OAuth app in your github account you will se a `Sign in to Github` button.
- Another PopUp for OAuth application will come up for you to Authorize access to Public and Private repositories. Authorize and you will be able to see repositories in TeamCity page now.

#### Add SSH Key to the Project

- You can also use SSH Key to configure VCS Root in the Project
- You will also need it when you have submodules in the repository.
- Select Project and select `SSH Keys`
- Click `Upload SSH Key`
- Select your Private key file you generally use. Refer [TeamCity link](https://www.jetbrains.com/help/teamcity/2020.2/ssh-keys-management.html) for more details

![](/assets/images/TeamCity_07.png)

- Create a new VCS Root to leverage the Key you have added. You cannot edit the existing Project
- Create a new VCS Root for your repository and Select uploaded key. `Test Connection` to see the settings are working

![](/assets/images/TeamCity_08.png) ![](/assets/images/TeamCity_09-768x665.png)

- Parameters
    - `VCS Root Name`
        - It can be anything but should be unique across projects
    - `Fetch URL`
        - Repository clone Url in SSH format
    - `Usrname`
        - It should be `git` for SSH Fetch Url
    - `Uploaded Key`
        - Select the key you have uploaded before

#### Deploy Applications using TeamCity

- [Deploy AspNetCore app inside docker](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/devops/jenkins/2021/03/22/deploy-aspnetcore-application-in-docker-using-teamcity/)

#### References

- [TeamCity Agent Docker Hub](https://hub.docker.com/r/jetbrains/teamcity-agent)
- [TeamCity Server Docker Hub](https://hub.docker.com/r/jetbrains/teamcity-server)
