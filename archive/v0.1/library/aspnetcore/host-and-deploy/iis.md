---
title: "Host ASP.NET Core on Windows with IIS"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/iis/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Host ASP.NET Core on Windows with IIS

-->
-->

Internet Information Services (IIS) is a flexible, secure, and manageable Web Server for hosting web apps, including ASP.NET Core.

## Supported platforms

The following operating systems are supported:

* Windows 7 or later
* Windows Server 2012 R2 or later

Apps published for 32-bit (x86) or 64-bit (x64) deployment are supported. Deploy a 32-bit app with a 32-bit (x86) .NET SDK unless the app:

* Requires the larger virtual memory address space available to a 64-bit app.
* Requires the larger IIS stack size.
* Has 64-bit native dependencies.

## Install the ASP.NET Core Module/Hosting Bundle

Download the latest installer using the following link:

Current .NET Hosting Bundle installer (direct download)

For more details instructions on how to install the ASP.NET Core Module, or installing different versions, see Install the .NET Hosting Bundle.

To download previous versions of the hosting bundle, see this GitHub issue.

## Get started

For getting started with hosting a website on IIS, see our getting started guide.

For getting started with hosting a website on Azure App Services, see our deploying to Azure App Service guide.

## Configuration

For configuration guidance, see Advanced configuration.

## Deployment resources for IIS administrators

* IIS documentation
* Getting Started with the IIS Manager in IIS
* .NET application deployment
* ASP.NET Core Module (ANCM) for IIS
* ASP.NET Core directory structure
* IIS modules with ASP.NET Core
* Troubleshoot ASP.NET Core on Azure App Service and IIS
* Common error troubleshooting for Azure App Service and IIS with ASP.NET Core

## Overlapped recycle

In general, we recommend using a pattern like blue-green deployments for zero-downtime deployments. Features like Overlapped Recycle help, but don't guarantee that you can do a zero-downtime deployment. For more information, see this GitHub issue.

## Optional client certificates

For information on apps that must protect a subset of the app with a certificate, see Optional client certificates.

## Additional resources

* Troubleshoot and debug ASP.NET Core projects
* Overview of ASP.NET Core
* The Official Microsoft IIS Site
* Windows Server technical content library
* HTTP/2 on IIS
* Transform web.config
