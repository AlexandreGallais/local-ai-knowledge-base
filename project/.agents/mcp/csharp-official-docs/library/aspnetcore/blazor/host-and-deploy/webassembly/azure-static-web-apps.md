---
title: "Host and deploy ASP.NET Core standalone Blazor WebAssembly with Azure Static Web Apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/webassembly/azure-static-web-apps.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Host and deploy ASP.NET Core standalone Blazor WebAssembly with Azure Static Web Apps

This article explains how to host and deploy standalone Blazor WebAssembly with Microsoft Azure Static Web Apps.

## App configuration

To ensure that requests for any path return `index.html`, set a navigation fallback route.

Create a file named `staticwebapp.config.json` in the project's root folder with the following content:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

## Deploy from Visual Studio

To deploy a standalone Blazor WebAssembly app from Visual Studio:

* Save any unsaved work in the project, as a Visual Studio restart might be required during the process.
* Follow the guidance at Deploy a Blazor app on Azure Static Web Apps: Deploy from Visual Studio (Azure Static Web Apps documentation).

## GitHub deployment scenarios

* Visual Studio Code: Quickstart: Build your first static site with Azure Static Web Apps
* .NET CLI: Deploy Blazor websites to the cloud with Azure Static Web Apps (Video)
* Deploy from GitHub: Tutorial: Building a static web app with Blazor in Azure Static Web Apps
