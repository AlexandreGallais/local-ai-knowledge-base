---
title: "ASP.NET Core Blazor file uploads (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/file-uploads.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor file uploads (part 5 of 5)

## Maximum parallel invocations per client hub setting

Blazor relies on `Microsoft.AspNetCore.SignalR.HubOptions.MaximumParallelInvocationsPerClient` set to 1, which is the default value.

Increasing the value leads to a high probability that `CopyTo` operations throw `System.InvalidOperationException: 'Reading is not allowed after reader was completed.'`. For more information, see MaximumParallelInvocationsPerClient > 1 breaks file upload in Blazor Server mode (`dotnet/aspnetcore` #53951).

## Troubleshoot

The line that calls `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` throws a `System.TimeoutException`:

> :::no-loc text="System.TimeoutException: Did not receive any data in the allotted time.":::

Possible causes:

* Using the Autofac Inversion of Control (IoC) container instead of the built-in ASP.NET Core dependency injection container in .NET 8 or earlier. To resolve the issue, set `Microsoft.AspNetCore.SignalR.HubOptions.DisableImplicitFromServicesParameters` to `true` in the server-side circuit handler hub options. For more information, see FileUpload: Did not receive any data in the allotted time (`dotnet/aspnetcore` #38842).

* Not reading the stream to completion. This isn't a framework issue. Trap the exception and investigate it further in your local environment/network.

* Using server-side rendering and calling `Microsoft.AspNetCore.Components.Forms.IBrowserFile.OpenReadStream*` on multiple files before reading them to completion. To resolve the issue, use the `LazyBrowserFileStream` class and approach described in the Upload files to a server with server-side rendering section of this article.

## Related content

* ASP.NET Core Blazor file downloads
* Upload files in ASP.NET Core
* ASP.NET Core Blazor forms overview
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
