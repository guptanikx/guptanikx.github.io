---
title: "Publish Github Package"
tags: 
  - "devops"
  - "git"
---

Generate PAT token in `Developer Settings` Github Repository
{: .msg-info}

- Add Nuget source to local
  ```bash
  dotnet nuget add source https://nuget.pkg.github.com/cloudxlabs/index.json -n github -u guptanikx -p GH_TOKEN --store-password-in-clear-text
  ```
    
- # Push Package to `MyGET` repository
  ```bash
  dotnet nuget push <package>.nupkg -k <api-key> -s https://www.myget.org/F/cloudxlabs/api/v2/package
  ```

- # Push to Artifactory
  ```bash
  dotnet nuget push <package>.nupkg -k <email>:<api-key> -s https://cloudxlabs.jfrog.io/artifactory/api/nuget/cloudxlabs
  ```

---

# Push to Github
- Add Nuget Source from CLI
  ```bash
  dotnet nuget add source --username $USERNAME --password $PAT_TOKEN --store-password-in-clear-text --name github "https://nuget.pkg.github.com/$OWNER/index.json"
  ```
- Add below Property tags to the `.csproj` file
  ```xml
  <PackageId>{Library Name}</PackageId>
  <Version>1.0.0</Version>
  <RepositoryUrl>https://github.com/guptanikx/azure-hack</RepositoryUrl>
  ``` 
- Build the Nuget Package
  ```bash
  dotnet pack <project name>
  ```
- Push the package to the repo from `Debug` or `Release` directory
  ```bash
  dotnet nuget push <pkg>.nupkg --api-key YOUR_GITHUB_PAT --source "github" 
  ```

---

# References
- [Github Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-nuget-registry){: .blank}
- [MyGet Packages](https://www.myget.org/feed/Details/cloudxlabs){: .blank}
