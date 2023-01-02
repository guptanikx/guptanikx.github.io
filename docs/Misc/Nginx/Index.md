---
title: Hosting in Nginx
---

- ### Add simple site
  - Install nginx
  ```sh
  sudo apt install nginx
  ```
  - Build you app and put it in `{src}` location
  - Default location of website is `/var/www/html`
  - Default location of config files is `/etc/nginx/conf.d/default.conf`
  - Copy `{src}` to `/var/www/html`
  - Create default.conf with below basic configuration
    ```text
    server {
        listen 80;
        server_name localhost;
        location / {
            root /var/www/html;
            index index.html;
        }
    }
    ```

  - Add SSL Certificate (optional)
    - Extract PEM and KEY file from PFX
        ```sh
        openssl pkcs12 -in cert.pfx -out site.pem -nodes
        openssl pkcs12 -in cert.pfx -nokeys clcerts -out site.crt
        ```

    - Copy both cert files in {xyz} location
    - Modify `default.conf` in `location` - `/etc/nginx/conf.d/default.conf` as below
      ```text
      server {
        listen 443 ssl;
        server_name cloudx-labs.in;
        ssl_certificate     /xyz/site.pem;
        ssl_certificate_key /xyz/site.key;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        location / {
            root /var/www/html;
            index index.html;
        }
      }
      ```
        - `root` - location of the code
          {: .config-args .mb-sm-1 }
          
        - `server_name` - add entry to `/etc/hosts` file if hosted on local 
          {: .config-args .mb-sm-1 }
