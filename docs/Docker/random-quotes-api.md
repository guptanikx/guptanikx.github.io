---
title: "Docker Random Quotes API"
date: "2021-03-15"
categories: 
  - "docker"
tags: 
  - "containers"
---

##### Environment

- Free Quotes API Url : https://goquotes-api.herokuapp.com/api/v1/random?count=1

##### Test the Connectivity

- Get the quote from API

				
					`wget -qO- https://goquotes-api.herokuapp.com/api/v1/random?count=1`
				
			

##### Generate Random Quotes Every 2 Seconds

- Â Write a infinite while loop to get random quotes

				
					`while : do     wget -qO- https://goquotes-api.herokuapp.com/api/v1/random?count=1     printf 'n' done`
				
			

- Compress the loop in single line using termination by `;`
    - Alternatively, You can also press `up` command so that linux will print the complete while loop in one line

				
					`while :; do  wget -qO- https://goquotes-api.herokuapp.com/api/v1/random?count=1; printf 'n'; done`
				
			

##### Run the Quotes in Container

- We will use the above command with Docker container to execute it inside container

				
					`docker run  --name quotes -d --network host alpine /bin/sh -c "while :; do  wget -qO- https://goquotes-api.herokuapp.com/api/v1/random?count=1; printf 'n'; sleep 5; done;"`
				
			

- Parameters
    - `docker run` - Start running the container with provided image and options
    - `-d` - Run in detach mode so that terminal is not stuck
    - `--network host`
        - There is sometimes issue with executing Https external urls inside containers when the host operating system is Virtual Machine. Host network makes sure to resolve the issue
    - `alpine` - Image name to run the command
    - `/bin/sh -c`
        - We are explicitly specifying the shell and `-c` option to treat the next string argument as command

##### References
