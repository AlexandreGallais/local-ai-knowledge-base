---
title: "Build a .NET MAUI Blazor Hybrid app with a Blazor Web App (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a .NET MAUI Blazor Hybrid app with a Blazor Web App

-->
-->

This article shows you how to build a .NET MAUI Blazor Hybrid app with a Blazor Web App that uses a shared user interface via a Razor class library (RCL).

## Prerequisites and preliminary steps

For prerequisites and preliminary steps, see the Build your first app tutorial. We recommend using the .NET MAUI Blazor Hybrid tutorial to set up your local system for .NET MAUI development before using the guidance in this article.

## .NET MAUI Blazor Hybrid and Web App solution template

The .NET MAUI Blazor Hybrid and Web App solution template sets up a solution that targets Android, iOS, Mac, Windows and Web that reuses UI. You can choose a Blazor interactive render mode for the web app and it creates the appropriate projects for the app, including a Blazor Web App and a .NET MAUI Blazor Hybrid app. A shared Razor class library (RCL) maintains the Razor components for the app's UI. The template also provides sample code to show you how to use dependency injection to provide different interface implementations for the Blazor Hybrid and Blazor Web App, which is covered in the Using interfaces to support different device implementations section of this article.

If you haven't already installed the .NET MAUI workload, install it now. The .NET MAUI workload provides the project template:

```dotnetcli
dotnet workload install maui
```

Create a solution from the project template with the following .NET CLI command, replacing the `{INTERACTIVITY}` placeholder with the Blazor render mode that you desire to use:

* `Server`: Adopts the Interactive Server render mode and produces a single-project Blazor app.
* `WebAssembly`: Adopts the Interactive WebAssembly render mode and produces two Blazor projects, a server project and a `.Client` project.
* `Auto`: Adopts the Interactive Auto render mode and produces two Blazor projects, a server project and a `.Client` project.

For more information on the preceding render modes and the projects produced, see ASP.NET Core Blazor render modes and the Use Blazor render modes section later in this article.

```dotnetcli
dotnet new maui-blazor-web -o MauiBlazorWeb -I {INTERACTIVITY}
```

In the preceding command:

* The `-o|--output` option creates a new folder for the app named `MauiBlazorWeb`.
* The `-I|--InteractivityPlatform` option sets the interactivity render mode. The `{INTERACTIVITY}` placeholder is the interactive Blazor render mode. All three interactive Blazor render modes (`Server`, `WebAssembly`, and `Auto`) are supported by the project template. For more information, see ASP.NET Core Blazor render modes and the Use Blazor render modes section.

The preceding command produces a Blazor app that adopts global interactivity, which is important because MAUI apps always run interactively and throw errors on Razor component pages that explicitly specify a render mode. For more information, see BlazorWebView needs a way to enable overriding ResolveComponentForRenderMode (`dotnet/aspnetcore` #51235).
