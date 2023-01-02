---
title: Nuget Package Management
---

- Nuget stores the repository source password in encrypted form by default
  {: .msg-warn }

- In case of PAT Token use Authentication Types as Basic
  {: .msg-warn }

- Few Repositories provide password which is already in encrypted form and required
  {: .msg-warn }
  
### Topics
- Adding custom Nuget Sources from DotNet CLI
	- Few Repositories provide password which is already in encrypted form and required explicit instruction to nuget to encrypt it further
	```bash
    dotnet nuget add source -n jfrog -u <user name> \ 
        -p <password> --store-password-in-clear-text \
        https://devignite.jfrog.io/artifactory/api/nuget/lab-nuget
	```
