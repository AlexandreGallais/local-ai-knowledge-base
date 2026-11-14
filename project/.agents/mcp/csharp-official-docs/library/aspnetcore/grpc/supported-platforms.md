---
title: "gRPC on .NET supported platforms"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/supported-platforms.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# gRPC on .NET supported platforms

By James Newton-King

This article discusses the requirements and supported platforms for using gRPC with .NET. There are different requirements for the two major gRPC workloads:

* Hosting gRPC services in ASP.NET Core
* Calling gRPC from .NET client apps

## Wire-formats

gRPC takes advantage of advanced features available in HTTP/2. HTTP/2 isn't supported everywhere, but a second wire-format using HTTP/1.1 is available for gRPC:

* `application/grpc` - gRPC over HTTP/2 is how gRPC is typically used.
* `application/grpc-web` - gRPC-Web modifies the gRPC protocol to be compatible with HTTP/1.1. gRPC-Web can be used in more places. gRPC-Web can be used by browser apps and in networks without complete support for HTTP/2. Two advanced gRPC features are no longer supported: client streaming and bidirectional streaming.

gRPC on .NET supports both wire-formats. `application/grpc` is used by default. gRPC-Web must be configured on the client and the server for successful gRPC-Web calls. For information on setting up gRPC-Web, see gRPC-Web in ASP.NET Core gRPC apps.

## ASP.NET Core gRPC server requirements

Hosting gRPC services with ASP.NET Core requires .NET Core 3.x or later.

>
> * .NET 5 or later
> * .NET Core 3

ASP.NET Core gRPC services can be hosted on all operating systems that .NET supports.

>
> * Windows
> * Linux
> * macOS

> **Note:**
> macOS is supported for ASP.NET Core development, testing, continuous integration (CI), and local services without external access, but not for production server workloads. There is no server edition of macOS, and Apple discontinued macOS Server. For production hosting, use Windows or Linux server distributions.

### Supported ASP.NET Core servers

All built-in ASP.NET Core servers are supported.

>
> * Kestrel
> * TestServer
> * IIS&dagger;
> * HTTP.sys&dagger;

&dagger;Requires .NET 5 and Windows 11 Build 22000 or Windows Server 2022 Build 20348 or later.

For information about configuring ASP.NET Core servers to run gRPC, see gRPC services with ASP.NET Core.

### Azure services

>
> * Azure Kubernetes Service (AKS)
> * Azure Container Apps
> * Azure App Service&dagger;

&dagger;gRPC requires a Linux-based environment on Azure App Service. See How-to deploy a .NET 6 gRPC app on App Service for Azure App Service deployment information.

## .NET gRPC client requirements

The Grpc.Net.Client package supports gRPC calls over HTTP/2 on .NET Core 3 and .NET 5 or later.

Limited support is available for gRPC over HTTP/2 on .NET Framework. Other .NET versions such as UWP and Unity don't have required HTTP/2 support, and must use gRPC-Web instead.

The following table lists .NET implementations and their gRPC client support.

| .NET implementation                          | gRPC over HTTP/2   | gRPC-Web   |
|----------------------------------------------|--------------------|------------|
| .NET 5 or later                              | ✔️                | ✔️         |
| .NET Core 3                                  | ✔️                | ✔️         |
| .NET Core 2.1                                | ❌                | ✔️         |
| .NET Framework 4.6.1                         | ⚠️&dagger;        | ✔️         |
| Blazor WebAssembly                           | ❌                | ✔️         |
| Mono 5.4                                     | ❌                | ✔️         |
| Universal Windows Platform 10.0.16299        | ❌                | ✔️         |
| Unity 2018.1                                 | ❌                | ✔️         |

&dagger;.NET Framework requires configuration of `System.Net.Http.WinHttpHandler` and Windows 11 or later, Windows Server 2019 or later. For more information, see Make gRPC calls on .NET Framework.

Using `Grpc.Net.Client` with gRPC-Web requires additional configuration. For more information:

* Configure gRPC-Web with the .NET gRPC client
* Use gRPC client with .NET Standard 2.0

> **Important:**
> gRPC-Web requires the client ***and*** server to support it. gRPC-Web can be quickly configured by an ASP.NET Core gRPC server. Other gRPC server implementations require a proxy to support gRPC-Web.

## Related content

* Use gRPC client with .NET Standard 2.0
* gRPC C# core-library
