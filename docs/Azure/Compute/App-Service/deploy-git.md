---
title: Deploy AppService using Git Repo
---

- Create and clone temporary git repo named `temp-webapp-git-deploy`
  - Or use [Source Code](https://github.com/guptanikx/temp-webapp-git-deploy)
- Create a new dotnet webapp project and commit the changes
  ```bash
  dotnet new mvc
  ```
- Create a app service plan and webapp
  ```bash
  az appservice plan create -n temp-040-git-deploy -g lab204 --sku free
  ```
- Create WebApp with above service plan
  ```bash
  az webapp create -n lab204-git-app --plan temp-040-git-deploy -g lab204
  ```
- Configure Git Repo for existing Webapp created previously
  ```bash
  az webapp deployment source config --name lab204-git-app -g lab204 \
    --repo-url $gitrepo --branch master --manual-integration
  ```

---

# References
- [Deploy WebApp with Git Repo](https://learn.microsoft.com/en-us/azure/app-service/scripts/cli-deploy-local-git?toc=%2Fcli%2Fazure%2Ftoc.json){: .blank}