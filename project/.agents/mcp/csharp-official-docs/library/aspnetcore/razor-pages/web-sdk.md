---
title: "ASP.NET Core Web SDK"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/web-sdk.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Web SDK

## Overview

`Microsoft.NET.Sdk.Web` is an MSBuild project SDK for building ASP.NET Core apps. It's possible to build an ASP.NET Core app without this SDK, however, the Web SDK is:

* Tailored towards providing a first-class experience.
* The recommended target for most users.

Use the Web.SDK in a project:

  ```xml
  <Project Sdk="Microsoft.NET.Sdk.Web">
    <!-- omitted for brevity -->
  </Project>
  ```

Features enabled by using the Web SDK:

* Implicitly references:

  * The ASP.NET Core shared framework.
  * Analyzers designed for building ASP.NET Core apps.
* The Web SDK imports MSBuild targets that enable the use of publish profiles and publishing using WebDeploy.

## Properties

| Property | Description |
| -------- | ----------- |
| `DisableImplicitFrameworkReferences` | Disables implicit reference to the `Microsoft.AspNetCore.App` shared framework. |
| `DisableImplicitAspNetCoreAnalyzers` | Disables implicit reference to ASP.NET Core analyzers. |
| `DisableImplicitComponentsAnalyzers` | Disables implicit reference to Razor Components analyzers when building Blazor (server) applications. |

For more information on tasks, targets, properties, implicit blobs, globs, publishing, methods, and more, see the README file in the WebSdk repository.
