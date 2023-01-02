---
title: "Deploy Aspnetcore Application in Docker using Jenkins"
date: "2021-03-21"
categories: 
  - "jenkins"
tags: 
  - "containers"
  - "devops-tools"
  - "jenkins"
---

#### Setup Environment

- Refer [Setup Jenkins](/devops/2021/03/21/setup-jenkins-using-container/)

#### Create Pipeline

- We will use the new UI BlueOcean from Left hand menu to create the pipeline.

![](/assets/images/Jenkins_04-181x300.png)

- As this is First Pipeline we will be prompted for creating New Pipeline

![](/assets/images/Jenkins_05-768x286.png)

- Before proceeding to next step create a new PAT (Personal Access Token) in Github for your account.
- It should have Full Repo access and User Email access.

![](/assets/images/Jenkins_06-768x386.png) ![](/assets/images/Jenkins_07.png)

- Now Select the GitHub option in BlueOcean and enter the token you have created.
- After enetering the Token it will display your repositories. Select one repository and Click `Create Pipeline`

![](/assets/images/Jenkins_08-226x300.png)

- BlueOcean will pull the branch and create a initial pipeline.
- Select the branch and you will be prompted to create a Stage and Steps.
- I have named the stage as `dev`.
- You will be prompted for adding Steps in Right Hand sidebar.

![](/assets/images/Jenkins_09-768x219.png)

- For First step select Shell Script and enter below command. As the repo i have used contains submodules this step is required. If your repo doesn't contains git submodules you can skip this step.
- Refer setup SSH key for GIT for submodules

				
					`git submodule update --init --recursive`
				

- For Second Step we will build the docker image using the Dockerfile in the repo.
- We need to add Jenkins user to the docker group so that Jenkins node can build the docker image else it will throw Permission denied error. Refer Add docker permissions to Jenkins user.

				
					`docker build -t mongo-app -f dotnet/Dockerfile dotnet/`
				

- After you finish adding the Steps it will ask for commting Jenkinsfile in the branch. Click Yes and then Pipeline will start building.
- Verify in Docker host that the image has been built

				
					`docker image ls -a | grep mongo-app`
				

- Add another stage as Deploy
- This stage we will deploy the app in local host container itself.

				
					`docker run --name mongo-app -p 9020:80 -d -e ASPNETCORE_ENVIRONMENT=DEV mongo-app`
				

#### References

- The Docker Workshop book.
