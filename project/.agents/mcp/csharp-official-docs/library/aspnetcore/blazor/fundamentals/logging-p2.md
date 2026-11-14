---
title: "ASP.NET Core Blazor logging (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/logging.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor logging (part 2 of 3)

## Client-side custom logger provider

The example in this section demonstrates a custom logger provider for further customization.

Add a package reference to the app for the `Microsoft.Extensions.Logging.Configuration` package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Add the following custom logger configuration. The configuration establishes a `LogLevels` dictionary that sets a custom log format for three log levels: `Microsoft.Extensions.Logging.LogLevel.Information`, `Microsoft.Extensions.Logging.LogLevel.Warning`, and `Microsoft.Extensions.Logging.LogLevel.Error`. A `LogFormat` `enum` is used to describe short (`LogFormat.Short`) and long (`LogFormat.Long`) formats.

`CustomLoggerConfiguration.cs`:

```csharp
using Microsoft.Extensions.Logging;

public class CustomLoggerConfiguration
{
    public int EventId { get; set; }

    public Dictionary<LogLevel, LogFormat> LogLevels { get; set; } = 
        new()
        {
            [LogLevel.Information] = LogFormat.Short,
            [LogLevel.Warning] = LogFormat.Short,
            [LogLevel.Error] = LogFormat.Long
        };

    public enum LogFormat
    {
        Short,
        Long
    }
}
```

Add the following custom logger to the app. The `CustomLogger` outputs custom log formats based on the `logLevel` values defined in the preceding `CustomLoggerConfiguration` configuration.

```csharp
using Microsoft.Extensions.Logging;
using static CustomLoggerConfiguration;

public sealed class CustomLogger : ILogger
{
    private readonly string name;
    private readonly Func<CustomLoggerConfiguration> getCurrentConfig;

    public CustomLogger(
        string name,
        Func<CustomLoggerConfiguration> getCurrentConfig) =>
        (this.name, this.getCurrentConfig) = (name, getCurrentConfig);

    public IDisposable BeginScope<TState>(TState state) => default!;

    public bool IsEnabled(LogLevel logLevel) =>
        getCurrentConfig().LogLevels.ContainsKey(logLevel);

    public void Log<TState>(
        LogLevel logLevel,
        EventId eventId,
        TState state,
        Exception? exception,
        Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        CustomLoggerConfiguration config = getCurrentConfig();

        if (config.EventId == 0 || config.EventId == eventId.Id)
        {
            switch (config.LogLevels[logLevel])
            {
                case LogFormat.Short:
                    Console.WriteLine($"{name}: {formatter(state, exception)}");
                    break;
                case LogFormat.Long:
                    Console.WriteLine($"[{eventId.Id, 2}: {logLevel, -12}] {name} - {formatter(state, exception)}");
                    break;
                default:
                    // No-op
                    break;
            }
        }
    }
}
```

Add the following custom logger provider to the app. `CustomLoggerProvider` adopts an `Options`-based approach to configure the logger via built-in logging configuration features. For example, the app can set or change log formats via an `appsettings.json` file without requiring code changes to the custom logger, which is demonstrated at the end of this section.

`CustomLoggerProvider.cs`:

```csharp
using System.Collections.Concurrent;
using Microsoft.Extensions.Options;

[ProviderAlias("CustomLog")]
public sealed class CustomLoggerProvider : ILoggerProvider
{
    private readonly IDisposable onChangeToken;
    private CustomLoggerConfiguration config;
    private readonly ConcurrentDictionary<string, CustomLogger> loggers =
        new(StringComparer.OrdinalIgnoreCase);

    public CustomLoggerProvider(
        IOptionsMonitor<CustomLoggerConfiguration> config)
    {
        this.config = config.CurrentValue;
        onChangeToken = config.OnChange(updatedConfig => this.config = updatedConfig);
    }

    public ILogger CreateLogger(string categoryName) =>
        loggers.GetOrAdd(categoryName, name => new CustomLogger(name, GetCurrentConfig));

    private CustomLoggerConfiguration GetCurrentConfig() => config;

    public void Dispose()
    {
        loggers.Clear();
        onChangeToken.Dispose();
    }
}
```

Add the following custom logger extensions.

`CustomLoggerExtensions.cs`:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Configuration;

public static class CustomLoggerExtensions
{
    public static ILoggingBuilder AddCustomLogger(
        this ILoggingBuilder builder)
    {
        builder.AddConfiguration();

        builder.Services.TryAddEnumerable(
            ServiceDescriptor.Singleton<ILoggerProvider, CustomLoggerProvider>());

        LoggerProviderOptions.RegisterProviderOptions
            <CustomLoggerConfiguration, CustomLoggerProvider>(builder.Services);

        return builder;
    }
}
```

In the `Program` file on the host builder, clear the existing provider by calling `Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders*` and add the custom logging provider:

```csharp
builder.Logging.ClearProviders().AddCustomLogger();
```

In the following `CustomLoggerExample` component:

* The debug message isn't logged.
* The information message is logged in the short format (`LogFormat.Short`).
* The warning message is logged in the short format (`LogFormat.Short`).
* The error message is logged in the long format  (`LogFormat.Long`).
* The trace message isn't logged.

`CustomLoggerExample.razor`:

```razor
@page "/custom-logger-example"
@inject ILogger<CustomLoggerExample> Logger

<p>
    <button @onclick="LogMessages">Log Messages</button>
</p>

@code{
    private void LogMessages()
    {
        Logger.LogDebug(1, "This is a debug message.");
        Logger.LogInformation(3, "This is an information message.");
        Logger.LogWarning(5, "This is a warning message.");
        Logger.LogError(7, "This is an error message.");
        Logger.LogTrace(5!, "This is a trace message.");
    }
}
```

The following output is seen in the browser's developer tools console when the **`Log Messages`** button is selected. The log entries reflect the appropriate formats applied by the custom logger (the client app is named `LoggingTest`):

> :::no-loc text="LoggingTest.Pages.CustomLoggerExample: This is an information message.":::
> :::no-loc text="LoggingTest.Pages.CustomLoggerExample: This is a warning message.":::
> :::no-loc text="[ 7: Error       ] LoggingTest.Pages.CustomLoggerExample - This is an error message.":::

From a casual inspection of the preceding example, it's apparent that setting the log line formats via the dictionary in `CustomLoggerConfiguration` isn't strictly necessary. The line formats applied by the custom logger (`CustomLogger`) could have been applied by merely checking the `logLevel` in the `Log` method. The purpose of assigning the log format via configuration is that the developer can change the log format easily via app configuration, as the following example demonstrates.

In the client-side app, add or update the `appsettings.json` file to include logging configuration. Set the log format to `Long` for all three log levels:

```json
{
  "Logging": {
    "CustomLog": {
      "LogLevels": {
        "Information": "Long",
        "Warning": "Long",
        "Error": "Long"
      }
    }
  }
}
```

In the preceding example, notice that the entry for the custom logger configuration is `CustomLog`, which was applied to the custom logger provider (`CustomLoggerProvider`) as an alias with `[ProviderAlias("CustomLog")]`. The logging configuration could have been applied with the name `CustomLoggerProvider` instead of `CustomLog`, but use of the alias `CustomLog` is more user friendly.

In the `Program` file, consume the logging configuration. Add the following code:

```csharp
builder.Logging.AddConfiguration(
    builder.Configuration.GetSection("Logging"));
```

The call to `Microsoft.Extensions.Logging.Configuration.LoggingBuilderConfigurationExtensions.AddConfiguration*` can be placed either before or after adding the custom logger provider.

Run the app again. Select the **`Log Messages`** button. Notice that the logging configuration is applied from the `appsettings.json` file. All three log entries are in the long (`LogFormat.Long`) format (the client app is named `LoggingTest`):

> :::no-loc text="[ 3: Information ] LoggingTest.Pages.CustomLoggerExample - This is an information message.":::
> :::no-loc text="[ 5: Warning     ] LoggingTest.Pages.CustomLoggerExample - This is a warning message.":::
> :::no-loc text="[ 7: Error       ] LoggingTest.Pages.CustomLoggerExample - This is an error message.":::

## Client-side log scopes

The developer tools console logger doesn't support log scopes. However, a custom logger can support log scopes. For an unsupported example that you can further develop to suit your needs, see the `BlazorWebAssemblyScopesLogger` sample app in the Blazor samples GitHub repository (how to download).

The sample app uses standard ASP.NET Core `Microsoft.Extensions.Logging.LoggerExtensions.BeginScope*` logging syntax to indicate scopes for logged messages. The `Logger` service in the following example is an `ILogger<CustomLoggerExample>`, which is injected into the app's `CustomLoggerExample` component (`CustomLoggerExample.razor`).

```csharp
using (Logger.BeginScope("L1"))
{
    Logger.LogInformation(3, "INFO: ONE scope.");
}

using (Logger.BeginScope("L1"))
{
    using (Logger.BeginScope("L2"))
    {
        Logger.LogInformation(3, "INFO: TWO scopes.");
    }
}

using (Logger.BeginScope("L1"))
{
    using (Logger.BeginScope("L2"))
    {
        using (Logger.BeginScope("L3"))
        {
            Logger.LogInformation(3, "INFO: THREE scopes.");
        }
    }
}
```

Output:

> :::no-loc text="[ 3: Information ] {CLASS} - INFO: ONE scope. => L1 blazor.webassembly.js:1:35542":::
> :::no-loc text="[ 3: Information ] {CLASS} - INFO: TWO scopes. => L1 => L2 blazor.webassembly.js:1:35542":::
> :::no-loc text="[ 3: Information ] {CLASS} - INFO: THREE scopes. => L1 => L2 => L3":::

The `{CLASS}` placeholder in the preceding example is `BlazorWebAssemblyScopesLogger.Pages.CustomLoggerExample`.

## Prerendered component logging

Prerendered components execute component initialization code twice. Logging takes place server-side on the first execution of initialization code and client-side on the second execution of initialization code. Depending on the goal of logging during initialization, check logs server-side, client-side, or both.

## SignalR client logging with the SignalR client builder

*This section applies to server-side apps.*

In Blazor script start configuration, pass in the `configureSignalR` configuration object that calls `configureLogging` with the log level.

For the `configureLogging` log level value, pass the argument as either the string or integer log level shown in the following table.

`Microsoft.Extensions.Logging.LogLevel`             | String setting | Integer setting
-------------------------------------------------------- | :------------: | :-------------:
`Microsoft.Extensions.Logging.LogLevel.Trace`       | `trace`        | 0
`Microsoft.Extensions.Logging.LogLevel.Debug`       | `debug`        | 1
`Microsoft.Extensions.Logging.LogLevel.Information` | `information`  | 2
`Microsoft.Extensions.Logging.LogLevel.Warning`     | `warning`      | 3
`Microsoft.Extensions.Logging.LogLevel.Error`       | `error`        | 4
`Microsoft.Extensions.Logging.LogLevel.Critical`    | `critical`     | 5
`Microsoft.Extensions.Logging.LogLevel.None`        | `none`         | 6

Example 1: Set the `Microsoft.Extensions.Logging.LogLevel.Information` log level with a string value.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.configureLogging("information");
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

Example 2: Set the `Microsoft.Extensions.Logging.LogLevel.Information` log level with an integer value.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    circuit: {
      configureSignalR: function (builder) {
        builder.configureLogging(2); // LogLevel.Information
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

> **Note:**
> Using an integer to specify the logging level in Example 2, often referred to as a *magic number* or *magic constant*, is considered a poor coding practice because the integer doesn't clearly identify the logging level when viewing the source code. If minimizing the bytes transferred to the browser is a priority, using an integer might be justified (consider removing the comment in such cases).

For more information on Blazor startup (`Blazor.start()`), see ASP.NET Core Blazor startup.
