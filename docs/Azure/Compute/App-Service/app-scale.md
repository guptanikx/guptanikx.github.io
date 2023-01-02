---
title: Azure WebApp Scaling
---

# Limit Number of Instance of Webapp Inside Shared App Service Plan
- Create App Service Plan with `Per Site Scaling`
  ```bash
  az appservice plan create -g lab204 -n lab204-app-plan --per-site-scaling=true
  ```
- Create Multiple webapps sharign same App Service Plan
  ```bash
  az webapp create -g lab204 -n lab204-webapp-1 --deployment-source-url https://github.com/guptanikx/temp-webapp-git-deploy --plan temp-040-git-deploy
  az webapp create -g lab204 -n lab204-webapp-2 --deployment-source-url https://github.com/guptanikx/temp-webapp-git-deploy --plan temp-040-git-deploy
  ```
- update Webapp `numberOfWorkers` to 1 to restrict single instance without scaling
  ```bash
  az webapp update -g lab204 -n lab204-webapp-1 siteConfig.numberOfWorkers=1
  ``` 
  - `numberOfWorkers` - Under PerSite scaling rule limits the instances of Webapp to configured value