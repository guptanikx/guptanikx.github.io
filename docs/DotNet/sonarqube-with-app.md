---
title: "CodeAnalysis for DotNetCore app using SonarQube"
date: "2021-03-24"
categories: 
  - "code-analysis"
tags: 
  - "codeanalysis"
  - "devops"
---

#### Setup Environment

- [Setup SonarQube]()

- Create Shell Script to Automate Analysis in Docker Environment
  - Shell Script
  ```bash
  `#!/bin/bash 
  SONAR_PROJECT_KEY=hack-mongo 
  SONAR_URL=$1 
  SONAR_TOKEN=$2 
  SONAR_ZIP=sonar-scanner-msbuild-5.1.0.28487-net5.0.zip 
  rm -rf sonar 
  wget -O sonar.zip https://github.com/SonarSource/sonar-scanner-msbuild/releases/download/5.1.0.28487/"$SONAR_ZIP" 
  unzip -d sonar sonar.zip 
  chmod +x -R sonar 
  dotnet sonar/SonarScanner.MSBuild.dll 
  begin /k:"$SONAR_PROJECT_KEY" /d:sonar.host.url="$SONAR_URL" /d:sonar.login="$SONAR_TOKEN"  
  dotnet restore dotnet build src/Service/Hack.Service.MongoDb.csproj 
  dotnet sonar/SonarScanner.MSBuild.dll end /d:sonar.login="$SONAR_TOKEN"
  ```

- Description
    - We need to pass the SonarQube url and Token to the Shell script as First and Second argument
        - Example
            - execute_sonar_analysis.sh http://192.168.118.128:9000 69e618e1609905bb1c120dc2c90cfa5911c0b14a
    - The latest version of sonar will be downloaded and Extract on local
    - Provide Execution permissions to Sonar Shell scripts using `chmod`
    - Use `Sonar MSBuild dll` which is meant for Dotnet 5.0 and above

- Verify in Sonar
![](/assets/images/Sonar_01-768x438.png)

---

### References
- The Docker Workshop book.
