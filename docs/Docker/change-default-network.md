---
title: Docker - Change Default Network to Host
---

- Modify `/etc/docker/daemon.json`
  ```bash
  sudo nano /etc/docker/daemon.json
  ```
- Add or replace
  ```json
  {
    "default-address-pools":
      [
        {"base": "10.10.0.0/16", "size":24}
      ]
  }
  ```
- Restart docker daemon
  ```bash
  sudo service docker restrart
  ```