---
title: "Understanding Dockerfile"
date: "2021-03-17"
categories: 
  - "docker"
tags: 
  - "containers"
---

- Simple Dockerfile
  - It pulls alpine latest image
  - Create src directory
  - Copy current folder contents to the src directory
	```dockerfile
	FROM alpine:latest RUN mkdir -p src COPY . src
	```	
- Below is step by step image layering for each command that is run in Dockerfile
    - Each command is written to a writeable layer and after command is completed the layer is locked.
    - For next command again new writeable layer is created on top of previous read only layer.
    - RUN, COPY and FROM commands creates a new layer every time they are used
	
	We should always try to keep the no. of layers as low as possible, reason being at time of execution the graph drivers needs to consolidate all layers which can increase the execution or startup time.
	{: .msg-info}


![](/assets/images/Docker_Image_Layers_01.png)

### Dockerfile Commands
- `FROM`
  - Tells the docker to pull the image from specified repository and tag
  - First docker will look into local cache and If repository is not specified docker hub repository is default
  - Syntax
	```dockerfile
	FROM <repository>:<tag> 
	// Example 
	FROM alpine:latest 
	// Use Azure Registry 
	FROM nikxlab.azurecr.io/alpine:latest			
	```		

- `COPY`
  - Copy complete directory
	```dockerfile
	COPY src .
	```
  - Flattens all top level files and directories
	```dockerfile
	COPY src/** .
	```
  - Flattens all files recursively in all subfolders
	```dockerfile
	COPY src/bin/**/* .
	```
  - Change owner of file while copying
	```dockerfile
	COPY --chown=username:groupname src/*.html /var/www/html
	```
- `ADD`
  - Similar to COPY directive with additional features
  - ADD command can unzip files and download from remote sources
  - ### Add the content from ZIP file
	```dockerfile
	ADD something.tar.gz src
	```
  - #### Adds remote zip file to the src and uncompress it
	```dockerfile
	ADD http://dataource.com/data.tar.gz src
	```
- `EXPOSE`
  - Opens a port for communication on Internal docker network.
  - Expose never maps Host port to container port. rather just opens the port.
  - Multiple EXPOSE commands can be used to open multiple ports
  - Simple Usage
	```dockerfile
	EXPOSE 80/tcp
	```
- `ENTRYPOINT` and `CMD`
  - Entrypoint is defined as the application that will be executed when container starts.
  - When ENTRYPOINT is specified CMD parameters becomes command arguments for the ENTRYPOINT process
  - When ENTRYPOINT is not specified we can invoke program with command arguments from CMD parameters
  - For both command the each argument is provided inidividually as Comma seperated
  - Example
    - ENTRYPOINT is suitable for process which do not require arguments or can run without arguments and arguments are needed or customization like `nginx`
    - CMD is suitable for CLI where you need to provide arguments without which CLI will not be able to progress like `dotnet` CLI.

###### ENTRYPOINT with command parameters

				
					`ENTRYPOINT ["nginx"]  CMD ["--port", "90"]`
				
			

###### CMD with arguments

				
					`CMD ["dotnet", "build", "Sample.csproj"]`
				
			

##### VOLUME

- Volumes are meant for persisting data and share across containers or host.
- When the container is run the a new volume is created in the host machineÂ  in location `/var/lib/docker/volumes` and this path is mapped to the path inside container with name that was declared in Dockerfile
- Example
    - When container is run with below image a new volume path is created in host machine and mapped to `/var/log/container-volume` path inside container

				
					`VOLUME ["/var/log/container-vol-name"]`
				
			

- Verify from `docker container inspect` after launching container

				
					`"Mounts": [             {                 "Type": "volume",                 "Name": "cd96c0fed211eb3e570d98f3f4caa0d0c86ec1cee2cdd686ffb2703d5d75e247",                 "Source": "/var/lib/docker/volumes/cd96c0fed211eb3e570d98f3f4caa0d0c86ec1cee2cdd686ffb2703d5d75e247/_data",                 "Destination": "/var/logs/container-vol-name",                 "Driver": "local",                 "Mode": "",                 "RW": true,                 "Propagation": ""             }         ],`

				
			

##### ENV

- This instruction set the Environment Variables within the image when it is built and also when it is executed.
- The declared ENV variables can be overriden when executing or building image.

##### ONBUILD

- This instruction is different in case it does not run when the primary image is build. This means, if this is defined in a Dockerfile then when building image from that Dockerfile this command will not run.Â 
- This instruction stashes the commands you have provide to execute when someone used the image you have created using this Dockerfile and consumes it to create another image.

				
					`// Following command will execute when someone is consuming the image which is created from this Dockerfile in child Dockerfile ONBUILD RUN apt-get upgrade`
				
			

#### References

- [docker build Arguments](https://docs.docker.com/engine/reference/commandline/build/#examples)
