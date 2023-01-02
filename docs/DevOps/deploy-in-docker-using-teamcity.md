---
title: "Deploy Aspnetcore Application in Docker using TeamCity"
date: "2021-03-22"
categories: 
  - "jenkins"
tags: 
  - "containers"
  - "devops-tools"
---

#### Setup Environment

- Refer [Setup TeamCity and Connect to Github](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/devops/jenkins/2021/03/22/setup-teamcity-using-container/)

#### Create Project

-  Select repository from dropdown and Click Proceed on next screen

![](/assets/images/TeamCity_05-768x481.png)

- TeamCity will ask for Selection of Auto-Selected Build Steps. Ignore this for now and we will create it manually.

#### Create Docker Build Configuration

- Click `Create Build configuration` on Project General Settings page
- Select `Manually` option in Build configuration

![](/assets/images/TeamCity_10-768x451.png)

- You will be redirected to Build settings page.
- Click `Attach VCS Root` and select the Root we added before
- If your repository has submodules, Follow process of Adding SSH key and VCS Root to project. Refer [Setup TeamCity and Connect to Github](https://jetpack-rewind-devignite-in-2021-12-10-03-58-54.local/devops/jenkins/2021/03/22/setup-teamcity-using-container/)

#### Create Docker Build Step

- Click `Build Steps` from Left menu and select Runner Type as `Docker`
- Fill in the details for the location of Dockerfile and context path. TeamCity also provides a mini repo explorer so that you can easily select folder or file

![](/assets/images/TeamCity_06-768x670.png)

#### Add Push Build step to Artifactory

- Add Connection to JFrog Artifactory from Project Connections. It can be used to Add any type of Docker Registry

![](/assets/images/TeamCity_11.png)

- Add Build Feature to the project to Login into Artifactory as build starts else you will receive error when pushing image step

![](/assets/images/TeamCity_12-768x340.png)

- Add Build step to Push newly build image to artifactory

![](/assets/images/TeamCity_13-768x489.png)

- Parameters
    - `Image name:tag`
        - Image name should correspond to the registry you are trying to push. In our case as we are pushing to Artifactory we will add Artifactory Repo prefix to the image name

#### Add Deploy Build step

- Add Deploy build step which will deploy to a Virtual machine over SSH. Install SSHD on the target machine
- Build Commands are as follows
    - Login into Artifactory using your credentials
    - Stop & Remove existing container on the machine
    - Run docker command to pull the artifactory image and execute container

![](/assets/images/TeamCity_14-768x563.png)

#### References

- The Docker Workshop book.
