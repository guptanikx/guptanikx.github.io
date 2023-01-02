---
title: WebApp CLI Commands
---

# [Source Codes for Exercise](/docs/Misc/source-codes.html){: .blank}

# Misc
  - List Runtimes
    ```bash
    az webapp list-runtimes --os-type linux
    az webapp list-runtimes --os-type windows
    ```
  ---

# Create App Service Plan
  - Create a basic app service plan
    ```bash
    az appservice plan create -g lab204 -n lab204-demoapp-plan
    ```
  - Create a standard app service plan with `four Linux workers`.
    ```bash
    az appservice plan create -g lab204 -n lab204-demoapp-plan --is-linux --number-of-workers 4 --sku S1
    ```
  - Create a `Windows container` app service plan.
    ```bash
    az appservice plan create -g lab204 -n lab204-demoapp-plan --hyper-v --sku P1V3
    ```
  - Create an app service plan for `app service environment`
    ```bash
    az appservice plan create -g lab204 -n lab204-demoapp-plan --app-service-environment lab204-svc-env --sku I1
    ```
  - With Independent scaling of each deployed app
    ```bash
    az appservice plan create -g lab204 -n lab204-app-plan --per-site-scaling true
    ```
  ---

# Create Webapp
  - Create simple WebApp
    ```bash
    az webapp create -g lab204 -n lab204-demoapp -p lab204-demoapp-plan 
    ```
  ---

# Deploy Webapp
  {: #deploy-webapp }
  - # At time of creating webapp
    ```bash
    az webapp create -g lab204 -n lab204-webapp-1 --deployment-source-url https://github.com/guptanikx/temp-webapp-git-deploy --plan lab204-app-plan
    ```
    
  - # Using `az webapp up` command
    - Automatically build, zip and deploy
    - Command should be run from root directory of the project
    {: .msg-info}

    - With Default Options
    ```bash
    az webapp up -g lab204 -n lab204-demoapp
    ```
      - Default Settings
          - `--os-type` - Windows
          - `--sku` - Free (F1)
          - `http-logging` - Enabled

    - With custom SKU and OsType 
    ```bash
    az webapp up -g lab204 -n lab204-demoapp --sku S1 --os-type linux
    ```
    - {: #deploy-static } Deploy Static WebApp (Run from root folder of content)
    ```bash
    az webapp up -g lab204 -n lab204-demo-static --html  
    ```
    - Deploy to specific target path to update content
      ```bash
      az webapp deploy -g lab204 -n lab204-static-app --src-path sample.html --target-path home/site/wwwroot/sample.html
      ```
    - Enable LogStream and Starting Log Stream after deployment 
    ```bash
    az webapp up -g lab204 -n lab204-demoapp --sku S1 --os-type linux --logs
    ```
  - # Using `az webapp deploy` command
    - Deploys ZIP files only
    - Build Source Code remotely using Oryx build
    - Does not create WebApp if it doesn't exist
    {: .msg-info}
    - For Zipping refer Source Codes Url Above
    - Deploy the zip file with source code so that Oryx can build
      ```bash
      az webapp deploy -g lab204 -n lab204-demoapp --src-path publish.zip
      ```
    - Clean the target files before deploying
      ```bash
      az webapp deploy -g lab204 -n lab204-demoapp --src-path publish.zip --clean
      ```
  ---

# Query Webapp Data
  - List All Outbound IP Address for the WebApp
    ```bash
    az webapp show -g lab204 -n lab204-demoapp --query outboundIpAddresses -o tsv
    ```

---

# References
- [az webapp](https://learn.microsoft.com/en-us/cli/azure/webapp/log?view=azure-cli-latest#az-webapp-log-config)