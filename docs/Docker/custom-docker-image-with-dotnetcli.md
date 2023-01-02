---
title: "Custom Docker image with DotNet CLI"
date: "2021-03-16"
categories: 
  - "docker"
tags: 
  - "custom image"
---

### What are images in Container world ?
- In Containers, the file system is a layered file system. As in Linux, everything is a file the container OS is also a layered file system.

![](/assets/images/docker_image_01.png)

- Above Image, The base layer is the main OS layer and all above layers are customized layers which in some way override the files in the layer below it.
- All **1 to n-1** layers in an image are immutable. Only top layer is writable layer. This means when we pull a image it is readonly. But when we consume it the Container orchestration adds a top thin layer which is writable so that operations can work without any issues.

![](/assets/images/docker_image_02.png)

- As images are immutable it means the image can be shared by multiple containers at the same time without implicity sharing any files between them.
- If top layer wants to modify some file from base layer, it copies the file and modify it because all below layers are immutable. Now the modified file becomes the primary file and rest of the files in base layers are untouched.

![](/assets/images/docker_image_03.png)

### Create a image with Dotnet Runtime 5 installed
- Pull ubuntu image and run in interactive mode
```bash
docker run --name core5 -it ubuntu:latest /bin/bash
```				
- Get update of the repositories and install `wget`
```bash
apt update 
apt-get install wget
```

- Download Microsoft official DotNetCore installation scipt.
- Make the shell file executable using `chmod +x`
- Run shell file to install dotnet core version
```bash
wget -O install.sh https://dot.net/v1/dotnet-install.sh
chmod +x install.sh
./install.sh
```

- Dotnet is installed in path `/root/.dotnet`. we need to add this path to the Path environment variable
```bash
echo export PATH=$PATH:/root/.dotnet | tee >> ~/.bashrc source ~/.bashrc
```
  - Parameters
    - `echo export`  - export updated environment variable PATH
    - `tee >> ~/.bashrc` - tee is pipeline that pass the input from echo to the target file .bashrc
    - reload .bashrc

- Verify by running dotnet command and exit the container
```bash
dotnet exit
```				

- Save the updated image with Dotnet CLI in image name `ubuntu-core`
```bash
docker container commit core5 ubuntu-core
```				

- Before commiting we can see the difference in original file and changes after installation
```bash
docker container diff core5
```				
