---
title: "ASP.NET Core Blazor logging (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/logging.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor logging

-->
-->

This article provides information on logging in Blazor apps, particularly in client-side logging scenarios.

For general ASP.NET Core logging guidance, including how to log from Razor components, see Logging in .NET and ASP.NET Core.

## Configuration

Logging configuration can be loaded from app settings files. For more information, see ASP.NET Core Blazor configuration.

At default log levels and without configuring additional logging providers:

* On the server, logging only occurs to the server-side .NET console in the `Development` environment at the `Microsoft.Extensions.Logging.LogLevel.Information` level or higher.
* On the client, logging only occurs to the client-side browser developer tools console at the `Microsoft.Extensions.Logging.LogLevel.Information` level or higher.

When the app is configured in the project file to use implicit namespaces (`<ImplicitUsings>enable</ImplicitUsings>`), a `using` directive for `Microsoft.Extensions.Logging` or any API in the `Microsoft.Extensions.Logging.LoggerExtensions` class isn't required to support API Visual Studio IntelliSense completions or building apps. If implicit namespaces aren't enabled, Razor components must explicitly define `@using` directives for logging namespaces that aren't imported via the imports file (`_Imports.razor`).

## Log levels

Log levels conform to ASP.NET Core app log levels, which are listed in the API documentation at `Microsoft.Extensions.Logging.LogLevel`.

## Client-side logging

Not every feature of ASP.NET Core logging is supported client-side. For example, client-side components don'<example-value>'s file system or network, so writing logs to the client'<example-value>'t possible. When using a third-party logging service designed to work with single-page apps (SPAs), follow the service's security guidance. Keep in mind that every piece of data, including keys or secrets stored client-side are ***insecure*** and can be easily discovered by malicious users.

Configure logging in client-side apps with the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Logging` property. The `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.Logging` property is of type `Microsoft.Extensions.Logging.ILoggingBuilder`, so the extension methods of `Microsoft.Extensions.Logging.ILoggingBuilder` are supported.

To set the minimum logging level, call `Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel*` on the host builder in the `Program` file with the `Microsoft.Extensions.Logging.LogLevel`. The following example sets the minimum log level to `Microsoft.Extensions.Logging.LogLevel.Warning`:

```csharp
builder.Logging.SetMinimumLevel(LogLevel.Warning);
```

## Log in the client-side `Program` file

Logging is supported in client-side apps after the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder` is built using the framework's internal console logger provider (`WebAssemblyConsoleLoggerProvider` (reference source)).

In the `Program` file:

```csharp
var host = builder.Build();

var logger = host.Services.GetRequiredService<ILoggerFactory>()
    .CreateLogger<Program>();

logger.LogInformation("Logged after the app is built in the Program file.");

await host.RunAsync();
```

Developer tools console output:

> :::no-loc text="info: Program[0]":::
> :::no-loc text="Logged after the app is built in the Program file.":::

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Client-side log category

Log categories are supported.

The following example shows how to use log categories with the `Counter` component of an app created from a Blazor project template.

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`) that injects an `Microsoft.Extensions.Logging.ILoggerFactory` as `LoggerFactory`:

```csharp
var logger = LoggerFactory.CreateLogger("CustomCategory");
logger.LogWarning("Someone has clicked me!");
```

Developer tools console output:

> :::no-loc text="warn: CustomCategory[0]":::
> :::no-loc text="Someone has clicked me!":::

## Client-side log event ID

Log event ID is supported.

The following example shows how to use log event IDs with the `Counter` component of an app created from a Blazor project template.

`LogEvent.cs`:

```csharp
public class LogEvent
{
    public const int Event1 = 1000;
    public const int Event2 = 1001;
}
```

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`):

```csharp
logger.LogInformation(LogEvent.Event1, "Someone has clicked me!");
logger.LogWarning(LogEvent.Event2, "Someone has clicked me!");
```

Developer tools console output:

> :::no-loc text="info: BlazorSample.Pages.Counter[1000]":::
> :::no-loc text="Someone has clicked me!":::
> :::no-loc text="warn: BlazorSample.Pages.Counter[1001]":::
> :::no-loc text="Someone has clicked me!":::

## Client-side log message template

Log message templates are supported:

The following example shows how to use log message templates with the `Counter` component of an app created from a Blazor project template.

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`):

```csharp
logger.LogInformation("Someone clicked me at {CurrentDT}!", DateTime.UtcNow);
```

Developer tools console output:

> :::no-loc text="info: BlazorSample.Pages.Counter[0]":::
> :::no-loc text="Someone clicked me at 04/21/2022 12:15:57!":::

## Client-side log exception parameters

Log exception parameters are supported.

The following example shows how to use log exception parameters with the `Counter` component of an app created from a Blazor project template.

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`):

```csharp
currentCount++;

try
{
    if (currentCount == 3)
    {
        currentCount = 4;
        throw new OperationCanceledException("Skip 3");
    }
}
catch (Exception ex)
{
    logger.LogWarning(ex, "Exception (currentCount: {Count})!", currentCount);
}
```

Developer tools console output:

> :::no-loc text="warn: BlazorSample.Pages.Counter[0]":::
> :::no-loc text="Exception (currentCount: 4)!":::
> :::no-loc text="System.OperationCanceledException: Skip 3":::
> :::no-loc text="at BlazorSample.Pages.Counter.IncrementCount() in C:\Users\Alaba\Desktop\BlazorSample\Pages\Counter.razor:line 28":::

## Client-side filter function

Filter functions are supported.

The following example shows how to use a filter with the `Counter` component of an app created from a Blazor project template.

In the `Program` file:

```csharp
builder.Logging.AddFilter((provider, category, logLevel) =>
    category.Equals("CustomCategory2") && logLevel == LogLevel.Information);
```

In the `IncrementCount` method of the app's `Counter` component (`Counter.razor`) that injects an `Microsoft.Extensions.Logging.ILoggerFactory` as `LoggerFactory`:

```csharp
var logger1 = LoggerFactory.CreateLogger("CustomCategory1");
logger1.LogInformation("Someone has clicked me!");

var logger2 = LoggerFactory.CreateLogger("CustomCategory1");
logger2.LogWarning("Someone has clicked me!");

var logger3 = LoggerFactory.CreateLogger("CustomCategory2");
logger3.LogInformation("Someone has clicked me!");

var logger4 = LoggerFactory.CreateLogger("CustomCategory2");
logger4.LogWarning("Someone has clicked me!");
```

In the developer tools console output, the filter only permits logging for the `CustomCategory2` category and `Microsoft.Extensions.Logging.LogLevel.Information` log level message:

> :::no-loc text="info: CustomCategory2[0]":::
> :::no-loc text="Someone has clicked me!":::

The app can also configure log filtering for specific namespaces. For example, set the log level to `Microsoft.Extensions.Logging.LogLevel.Trace` in the `Program` file:

```csharp
builder.Logging.SetMinimumLevel(LogLevel.Trace);
```

Normally at the `Microsoft.Extensions.Logging.LogLevel.Trace` log level, developer tools console output at the **Verbose** level includes `Microsoft.AspNetCore.Components.RenderTree` logging messages, such as the following:

> :::no-loc text="dbug: Microsoft.AspNetCore.Components.RenderTree.Renderer[3]":::
> :::no-loc text="Rendering component 14 of type Microsoft.AspNetCore.Components.Web.HeadOutlet":::

In the `Program` file, logging messages specific to `Microsoft.AspNetCore.Components.RenderTree` can be disabled using ***either*** of the following approaches:

* ```csharp
  builder.Logging.AddFilter("Microsoft.AspNetCore.Components.RenderTree.*", LogLevel.None);
  ```

* ```csharp
  builder.Services.PostConfigure<LoggerFilterOptions>(options =>
      options.Rules.Add(
          new LoggerFilterRule(null, 
                               "Microsoft.AspNetCore.Components.RenderTree.*", 
                               LogLevel.None, 
                               null)
      ));
  ```

After ***either*** of the preceding filters is added to the app, the console output at the **Verbose** level doesn't show logging messages from the `Microsoft.AspNetCore.Components.RenderTree` API.
