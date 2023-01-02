---
layout: default
---

# Source Codes
- Dotnet Core
  - [WebAPI with Docker](https://github.com/guptanikx/deplo-apps/tree/main/dotnet/Labs.DockerLinuxApp)
- Static Html
  - [Static Pages](https://github.com/guptanikx/deplo-apps/tree/main/static-html)


# Zipping Source Code
- Dotnet
  - Zip File should directly contains Assemblies or exeutables
```bash
dotnet publish -c Release -o publis
cd publish && zip publish.zip -r .
```