---
title: Azure - Spring Server
---

### CLI
- Create Spring Server
```bash
az spring-cloud app create -n lab400-spring-service -g lab400 -s lab-spring-server
```

- Create MongoDB
```bash
az cosmosdb create --name lab-spring-server-mongodb --king MongoDB
```

- Download Spring SDK
```bash
curl https://start.spring.io/starter.tgz -d dependencies=web,data-mongodb,cloud-eureka,cloud-config-client \
    -d baseDir=todo-service -d bootVersion=2.2.5.RELEASE | tar -xzvf -
```
 
- Deploy App
```bash
az spring-cloud app deploy -n todo-service --jar-path target/demo-0.0.1-SNAPSHOT.jar
```

---

### References
- [Spring Server](https://docs.microsoft.com/en-us/learn/modules/azure-spring-cloud-workshop/6-configure-distributed-tracing)