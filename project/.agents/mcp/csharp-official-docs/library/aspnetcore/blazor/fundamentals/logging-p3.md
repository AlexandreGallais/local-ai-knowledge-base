---
title: "ASP.NET Core Blazor logging (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/logging.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor logging (part 3 of 3)

## SignalR client logging with app configuration

Set up app settings configuration as described in ASP.NET Core Blazor configuration. Place app settings files in `wwwroot` that contain a `Logging:LogLevel:HubConnection` app setting.

> **Note:**
> As an alternative to using app settings, you can pass the `Microsoft.Extensions.Logging.LogLevel` as the argument to `Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel*` when the hub connection is created in a Razor component. However, accidentally deploying the app to a production hosting environment with verbose logging may result in a performance penalty. We recommend using app settings to set the log level.

Provide a `Logging:LogLevel:HubConnection` app setting in the default `appsettings.json` file and in the `Development` environment app settings file. Use a typical less-verbose log level for the default, such as `Microsoft.Extensions.Logging.LogLevel.Warning`. The default app settings value is what is used in `Staging` and `Production` environments if no app settings files for those environments are present. Use a verbose log level in the `Development` environment app settings file, such as `Microsoft.Extensions.Logging.LogLevel.Trace`.

`wwwroot/appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "HubConnection": "Warning"
    }
  }
}
```

`wwwroot/appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "HubConnection": "Trace"
    }
  }
}
```

> **Important:**
> Configuration in the preceding app settings files is only used by the app if the guidance in ASP.NET Core Blazor configuration is followed.

At the top of the Razor component file (`.razor`):

* Inject an `Microsoft.Extensions.Logging.ILoggerProvider` to add a `WebAssemblyConsoleLogger` to the logging providers passed to `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. Unlike a `Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider`, `WebAssemblyConsoleLogger` is a wrapper around browser-specific logging APIs (for example, `console.log`). Use of `WebAssemblyConsoleLogger` makes logging possible within Mono inside a browser context.
* Inject an `IConfiguration` to read the `Logging:LogLevel:HubConnection` app setting.

> **Note:**
> `WebAssemblyConsoleLogger` is internal and not supported for direct use in developer code.

```csharp
@inject ILoggerProvider LoggerProvider
@inject IConfiguration Config
```

> **Note:**
> The following example is based on the demonstration in the SignalR with Blazor tutorial. Consult the tutorial for further details.

In the component's `OnInitializedAsync` method, use `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilderExtensions.ConfigureLogging*` to add the logging provider and set the minimum log level from configuration:

```csharp
protected override async Task OnInitializedAsync()
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
        .ConfigureLogging(builder => 
        {
            builder.AddProvider(LoggerProvider);
            builder.SetMinimumLevel(
                Config.GetValue<LogLevel>("Logging:LogLevel:HubConnection"));
        })
        .Build();

    hubConnection.On<string, string>("ReceiveMessage", (user, message) => ...

    await hubConnection.StartAsync();
}
```

> **Note:**
> In the preceding example, `Navigation` is an injected `Microsoft.AspNetCore.Components.NavigationManager`.

For more information on setting the app's environment, see ASP.NET Core Blazor environments.

## Client-side authentication logging

Log Blazor authentication messages at the `Microsoft.Extensions.Logging.LogLevel.Debug` or `Microsoft.Extensions.Logging.LogLevel.Trace` logging levels with a logging configuration in app settings or by using a log filter for `Microsoft.AspNetCore.Components.WebAssembly.Authentication` in the `Program` file.

Use ***either*** of the following approaches:

* In an app settings file (for example, `wwwroot/appsettings.Development.json`):

  ```json
  "Logging": {
    "LogLevel": {
      "Microsoft.AspNetCore.Components.WebAssembly.Authentication": "Debug"
    }
  }
  ```

  For more information on how to configure a client-side app to read app settings files, see ASP.NET Core Blazor configuration.

* Using a log filter, the following example:

  * Activates logging for the `Debug` build configuration using a C# preprocessor directive.
  * Logs Blazor authentication messages at the `Microsoft.Extensions.Logging.LogLevel.Debug` log level.

  ```csharp
  #if DEBUG
      builder.Logging.AddFilter(
          "Microsoft.AspNetCore.Components.WebAssembly.Authentication", 
          LogLevel.Debug);
  #endif
  ```

> **Note:**
> Razor components rendered on the client only log to the client-side browser developer tools console.

## Related content

* Logging in .NET and ASP.NET Core
* `Loglevel` Enum (API documentation)
* Implement a custom logging provider in .NET
* Browser developer tools documentation:
  * Chrome DevTools
  * Microsoft Edge Developer Tools overview
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
