---
title: Docker - Join two containers in same Network Namespace
---

### Steps
- Run a nginx container image
  ```bash
  docker run -d --name nginx -p 8080:80 nginx
  ```
- Get PID for the container
  ```bash
  ps -af | grep nginx
  ```
- Launch another container in same Network Namespace
  ```bash
  docker run -it --net container:nginx --name netshoot nicolaka/netshoot
  ```
- Get PID for above container
  ```bash
  ps -af | grep netshoot
  ```
- Observe both containers NET namespace values are same
  ```bash
  ls -l /proc/<PID for nginx>/ns/pid
  ls -l /proc/<PID for netshoot>/ns/pid
  ```


