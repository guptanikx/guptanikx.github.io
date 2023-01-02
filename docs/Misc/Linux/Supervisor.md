---
Title: Linux - Supervisor Linux
description: Simple background Task scheduler
---

Command `supervisorctl` is used to control background daemon `supervisord`
{: .msg-info }


- Install `supervisor`
```bash
sudo apt-get install -y supervisor
```

- Create Configuration file `webapi.conf` for your application in directory `/etc/supervisor/conf.d`.
	```text
	[supervisord]
	logfile = /tmp/supervisord.log

	[program:webapi]
	command = /home/nikx/src/lab-golang/golang/bin/webapi
	autostart=true
	autorestart=true
	redirect_stderr=true
	```

- Notify daemon to update and restart itself
```bash
supervisorctl reread
supervisorctl update
```

- Verify if your process is running
```bash
supervisorctl
```
