---
title: "Create Artifact Feed"
date: "2021-03-12"
categories: 
  - "azure-devops"
tags: 
  - "artifacts-management"
  - "devops"
---

Add Permissions to `Project Build Service` before Publishing to DevOps Artifact Feed
{: .msg-info}

### Provisioning
- Create a new Feed or use Organization Feed in DevOps Artifacts
- Build, Pack and Publish the package to DevOps Artifact Feed

  ```yaml
  pool:
  vmImage: 'ubuntu-latest'
  steps:
  - task: DotNetCoreCLI@2
    inputs:
      command: 'restore'
      projects: 'src/CMI.Services.Onboarding.csproj'
      feedsToUse: 'select'
  - task: DotNetCoreCLI@2
    inputs:
      command: 'build'
      projects: 'src/CMI.Services.Onboarding.csproj'
  - task: NuGetCommand@2
    inputs:
      command: 'pack'
      packagesToPack: 'src/*.csproj'
      versioningScheme: 'byPrereleaseNumber'
      majorVersion: '1'
      minorVersion: '0'
      patchVersion: '0'
      includeSymbols: true
  - task: NuGetCommand@2
    inputs:
      command: 'push'
      packagesToPush: '$(Build.ArtifactStagingDirectory)/**/*.nupkg;!$(Build.ArtifactStagingDirectory)/**/*.symbols.nupkg'
      nuGetFeedType: 'internal'
      publishVstsFeed: '4134f43e-96a0-4b76-9e48-bc603364517c'
  ```

---

### References
- [Publish Artifact](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops&tabs=yaml)
