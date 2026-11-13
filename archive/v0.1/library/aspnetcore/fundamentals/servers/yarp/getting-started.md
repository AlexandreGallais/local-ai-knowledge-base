---
title: "Get started with YARP"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/yarp/getting-started.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Get started with YARP

YARP is designed as a .NET library that provides core proxy functionality. You can customize the library by adding or replacing modules. YARP is currently provided as a NuGet package and code samples, but a project template and prebuilt executable (`.exe`) are planned for the future.

YARP is implemented on top of .NET infrastructure. You can develop apps on Windows, Linux, or macOS with the .NET SDK and your favorite editor: Microsoft Visual Studio or Visual Studio Code. For production hosting, use Windows or Linux server distributions.

> **Note:**
> macOS is supported for ASP.NET Core development, testing, continuous integration (CI), and local services without external access, but not for production server workloads. There is no server edition of macOS, and Apple discontinued macOS Server. For production hosting, use Windows or Linux server distributions.

YARP 2.3.0 supports .NET 8 or later. You can download the .NET SDK from https://dotnet.microsoft.com/download/dotnet/.

This article describes how to create a basic ASP.NET Core app that uses the YARP library.

## Create a new project

Start by creating an empty ASP.NET Core app from the command line:

```dotnetcli
dotnet new web -n MyProxy
```

Or, build a new ASP.NET Core web app in Visual Studio 2022 by selecting **Empty** for the project template.

> **Note:**
> For the complete version of the project implemented in this article, download the Basic YARP Sample on GitHub.

## Add the YARP package reference

Add a package reference for Yarp.ReverseProxy version 2.3.0 or later.

```dotnetcli
dotnet add package Yarp.ReverseProxy
```

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

## Add the YARP middleware

Update the _Program.cs_ file to use the YARP middleware:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));
var app = builder.Build();
app.MapReverseProxy();
app.Run();
```

## Customize the YARP configuration

The configuration for YARP is defined in the _appsettings.json_ file. For more information, see YARP configuration files.

You can also specify the configuration programmatically. For more information, see YARP extensibility: Configuration providers.

To learn more about the available configuration options, see the `Yarp.ReverseProxy.Configuration.RouteConfig` and `Yarp.ReverseProxy.Configuration.ClusterConfig` reference articles.

```json
 {
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "ReverseProxy": {
    "Routes": {
      "route1" : {
        "ClusterId": "cluster1",
        "Match": {
          "Path": "{**catch-all}"
        }
      }
    },
    "Clusters": {
      "cluster1": {
        "Destinations": {
          "destination1": {
            "Address": "https://example.com/"
          }
        }
      }
    }
  }
}
```

## Run your YARP project application

To run your new YARP project:

- **.NET CLI**: Run the `dotnet run` command within the sample's directory, or use the `dotnet run --project ` command.

- **Visual Studio**: Start the app by selecting **Run** on the main menubar.

## Related content

- Basic YARP sample on GitHub
- YARP Configuration Files
- YARP extensibility: Configuration providers
