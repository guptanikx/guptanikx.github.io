---
title: "Docker Container Logging with Splunk"
date: "2021-03-26"
categories: 
  - "docker"
  - "logging"
tags: 
  - "containers"
---

### Setup Splunk Host in Container
- Run Splunk Host in  a seperate virtul machine than application, otherwise ports may conflict
```bash
docker run -d -p 8000:8000 -p 9997:9997 -p 8088:8088 \
    -e "SPLUNK_START_ARGS=--accept-license" -e "SPLUNK_PASSWORD=demo0580" \
    --name splunk splunk/splunk
```
- Splunk Ports
    - `8000`
        - Web UI
    - `9997`
        - Splunk Forwarder Agent
    - `8089`
        - Splunk HEC Collector Event port
    - `8080`
        - For Splunk Indexer Communication

- Splunk image can work both as Forwarder and Host
- In this Example we will use HEC (Host Event collector) Url to send logs to Splunk host
- Enable HEC option on Splunk host. Navigate to `Settings -> Data Input`

![](/assets/images/splunk_01-768x205.png)

- Add HEC Collector details
- Data source name can be anything
- The SourceType should be either Automatic or Uncategorized

![](/assets/images/splunk_02-768x305.png) ![](/assets/images/splunk_03-768x638.png)

- Generate a new token from Settings -> Token. We will need this token to provide when attaching to container
- Disable SSL for Tokens at Global level or token level

![](/assets/images/splunk_04-768x457.png)

### Setup AspNetCore app for Logging
- Any AspNetCore app by default logs to `stdout`. We don't need any specific settings
- Starting container with application and redirect logger to the Splunk HEC Endpoint we created
```bash
docker container run --name mongo-app \
    -e ASPNETCORE_ENVIRONMENT=DEV -e Mongodb_Connection="mongodb://192.168.118.129:27017" \
    -p 9100:80 --log-driver=splunk --log-opt splunk-url=http://192.168.118.130:8088     --log-opt splunk-token=88badeb1-6733-4747-9ef6-1711e2922e51 mongo-app
```
  - Parameters
    - `log-driver`
      - Provider as splunk supported natively by docker
    - `log-opt`
      - `splunk-url`
   - The IP address of splunk host on 8088 port as splunk has by default 8088 as HEC port
      - `splunk-token`
   - The token we created before when setting up Splunk host

- If docker is not able to connect to the HEC endpoint it will throw error. Recheck the Splunk host configuration
- Generate some traffic on the application so that logs are written to stdout and logged in splunk automatically by docker
- Verify Logs in Splunk

![](/assets/images/splunk_05-768x348.png)

---

### References
- [Splunk Documentation](https://docs.splunk.com/Documentation)
- [Splunk Docker](https://hub.docker.com/r/splunk/splunk/)
