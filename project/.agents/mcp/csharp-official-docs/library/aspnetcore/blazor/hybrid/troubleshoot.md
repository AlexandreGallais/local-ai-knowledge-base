---
title: "Troubleshoot ASP.NET Core Blazor Hybrid"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/hybrid/troubleshoot.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Troubleshoot ASP.NET Core Blazor Hybrid

`Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` has built-in logging that can help you diagnose problems in your Blazor Hybrid app.

This article explains the steps to use `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` logging:

* Enable `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` and related components to log diagnostic information.
* Configure logging providers.
* View logger output.

## Enable `BlazorWebView` logging

Enable logging configuration during service registration. To enable maximum logging for `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` and related components under the `Microsoft.AspNetCore.Components.WebView` namespace, add the following code in the `Program` file:

```csharp
services.AddLogging(logging =>
{
    logging.AddFilter("Microsoft.AspNetCore.Components.WebView", LogLevel.Trace);
});
```

Alternatively, use the following code to enable maximum logging for every component that uses `Microsoft.Extensions.Logging`:

```csharp
services.AddLogging(logging =>
{
    logging.SetMinimumLevel(LogLevel.Trace);
});
```

## Configure logging providers

After configuring components to write log information, configure where the loggers should write log information.

The **Debug** logging providers write the output using `Debug` statements.

To configure the **Debug** logging provider, add a reference to the `Microsoft.Extensions.Logging.Debug` NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Register the provider inside the call to `Microsoft.Extensions.DependencyInjection.LoggingServiceCollectionExtensions.AddLogging*` added in the previous step by calling the `Microsoft.Extensions.Logging.DebugLoggerFactoryExtensions.AddDebug*` extension method:

```csharp
services.AddLogging(logging =>
{
    logging.AddFilter("Microsoft.AspNetCore.Components.WebView", LogLevel.Trace);
    logging.AddDebug();
});
```

## View logger output

When the app is run from Visual Studio with debugging enabled, the debug output appears in Visual Studio's **Output** window.

## Related content

* Logging in C# and .NET
* Logging in .NET and ASP.NET Core
