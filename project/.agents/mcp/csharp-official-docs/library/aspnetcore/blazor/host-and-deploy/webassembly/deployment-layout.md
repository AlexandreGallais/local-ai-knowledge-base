---
title: "Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/webassembly/deployment-layout.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps

This article explains how to enable hosted Blazor WebAssembly deployments in environments that block the download and execution of dynamic-link library (DLL) files.

> **Note:**
> This guidance addresses environments that block clients from downloading and executing DLLs. In .NET 8 or later, Blazor uses the Webcil file format to address this problem. For more information, see Host and deploy ASP.NET Core Blazor WebAssembly. Multipart bundling using the experimental NuGet package described by this article isn't supported for Blazor apps in .NET 8 or later. You can use the guidance in this article to create your own multipart bundling NuGet package for .NET 8 or later.

Blazor WebAssembly apps require dynamic-link libraries (DLLs) to function, but some environments block clients from downloading and executing DLLs. Security products are often able to scan the content of files traversing the network and block or quarantine DLL files. This article describes one approach for enabling Blazor WebAssembly apps in these environments, where a multipart bundle file is created from the app's DLLs so that the DLLs can be downloaded together bypassing security restrictions.

A hosted Blazor WebAssembly app can customize its published files and packaging of app DLLs using the following features:

* JavaScript initializers that allow customizing the Blazor boot process.
* MSBuild extensibility to transform the list of published files and define *Blazor Publish Extensions*. Blazor Publish Extensions are files defined during the publish process that provide an alternative representation for the set of files required to run a published Blazor WebAssembly app. In this article, a Blazor Publish Extension is created that produces a multipart bundle with all of the app's DLLs packed into a single file so that the DLLs can be downloaded together.

The approach demonstrated in this article serves as a starting point for developers to devise their own strategies and custom loading processes.

> **Warning:**
> Any approach taken to circumvent a security restriction must be carefully considered for its security implications. We recommend exploring the subject further with your organization's network security professionals before adopting the approach in this article. Alternatives to consider include:
>
> * Enable security appliances and security software to permit network clients to download and use the exact files required by a Blazor WebAssembly app.
> * Switch from the Blazor WebAssembly hosting model to the Blazor Server hosting model, which maintains all of the app's C# code on the server and doesn't require downloading DLLs to clients. Blazor Server also offers the advantage of keeping C# code private without requiring the use of web API apps for C# code privacy with Blazor WebAssembly apps.

## Experimental NuGet package and sample app

The approach described in this article is used by the *experimental* `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle` package (NuGet.org) for apps targeting .NET 6 or later. The package contains MSBuild targets to customize the Blazor publish output and a JavaScript initializer to use a custom boot resource loader, each of which are described in detail later in this article.

> **Warning:**
> Experimental and preview features are provided for the purpose of collecting feedback and aren't supported for production use.

Later in this article, the Customize the Blazor WebAssembly loading process via a NuGet package section with its three subsections provide detailed explanations on the configuration and code in the `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle` package. The detailed explanations are important to understand when you create your own strategy and custom loading process for Blazor WebAssembly apps. To use the published, experimental, unsupported NuGet package without customization as a **local demonstration**, perform the following steps:

1. Use an existing hosted Blazor WebAssembly solution or create a new solution from the Blazor WebAssembly project template using Visual Studio or by passing the `-ho|--hosted` option to the `dotnet new` command (`dotnet new blazorwasm -ho`). For more information, see Tooling for ASP.NET Core Blazor.

1. In the **:::no-loc text="Client":::** project, add the experimental `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle` package.

   > **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

1. In the **:::no-loc text="Server":::** project, add an endpoint for serving the bundle file (`app.bundle`). Example code can be found in the Serve the bundle from the host server app section of this article.

1. Publish the app in Release configuration.
