---
title: Various ways to monitor logs in Azure WebApp
categories: 
  - "webapp logs"
---

- [Refer for complete CLI Options](cli.html)
- Create Common Variables
  ```bash
  export NAME=lab204demoapp
  export RG=lab204
  ```

- Configure WebApp Logging
  ```bash
  az webapp log config [--application-logging {azureblobstorage, filesystem, off}]
                     [--detailed-error-messages {false, true}]
                     [--docker-container-logging {filesystem, off}]
                     [--failed-request-tracing {false, true}]
                     [--level {error, information, verbose, warning}]
                     [--web-server-logging {filesystem, off}]
  ```
- Tail Logs
  ```bash
  az webapp log tail -n $NAME -g $RG 
  ```

- Tail Http Logs
  ```bash
  az webapp log tail -n $NAME -g $RG --provider http
  ```

- Tail Application Logs
  ```bash
  az webapp log tail -n $NAME -g $RG --provider application
  ```
- Using CURL to Stream logs - See References

---

- ### References
  - [Diagnostic Logs](https://github.com/projectkudu/kudu/wiki/Diagnostic-Log-Stream){: .blank}