---
title: "ASP.NET Core directory structure"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/directory-structure.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core directory structure

The *publish* directory contains the app's deployable assets produced by the dotnet publish command. The directory contains:

* Application files
* Configuration files
* Static assets
* Packages
* A runtime (self-contained deployment only)

| App Type | Directory Structure |
| -------- | ------------------- |
| Framework-dependent Executable (FDE) | publish&dagger;Views&dagger; MVC apps; if views aren't precompiledPages&dagger; MVC or Razor Pages apps, if pages aren't precompiledwwwroot&dagger;\*.dll files{ASSEMBLY NAME}.deps.json{ASSEMBLY NAME}.dll{ASSEMBLY NAME}{.EXTENSION}.exe extension on Windows, no extension on macOS or Linux{ASSEMBLY NAME}.pdb{ASSEMBLY NAME}.runtimeconfig.jsonweb.config (IIS deployments)createdump (Linux createdump utility)\*.so (Linux shared object library)\*.a (macOS archive)\*.dylib (macOS dynamic library) |
| Self-contained Deployment (SCD) | publish&dagger;Views&dagger; MVC apps, if views aren't precompiledPages&dagger; MVC or Razor Pages apps, if pages aren't precompiledwwwroot&dagger;\*.dll files{ASSEMBLY NAME}.deps.json{ASSEMBLY NAME}.dll{ASSEMBLY NAME}{.EXTENSION} .exe extension on Windows, no extension on macOS or Linux{ASSEMBLY NAME}.pdb{ASSEMBLY NAME}.runtimeconfig.jsonweb.config (IIS deployments) |

&dagger;Indicates a directory

The *publish* directory represents the *content root path*, also called the *application base path*, of the deployment. Whatever name is given to the *publish* directory of the deployed app on the server, its location serves as the server's physical path to the hosted app.

The *wwwroot* directory, if present, only contains static assets.

## Additional resources

* dotnet publish
* .NET application deployment
* Target frameworks
* .NET RID Catalog
