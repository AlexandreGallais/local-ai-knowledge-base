---
title: "Logging in .NET and ASP.NET Core (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/logging/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Logging in .NET and ASP.NET Core (part 4 of 5)

## Built-in logging providers

ASP.NET Core includes the following logging providers:

* `Console`
* `Debug`
* `EventSource`
* Windows `EventLog`

The following logging providers are provided by Microsoft, but not as part of the .NET shared framework. They must be installed as an additional NuGet package added to the app.

* `AzureAppServicesFile` and `AzureAppServicesBlob`
* `ApplicationInsights`

ASP.NET Core doesn't include a logging provider for writing logs to files. To write logs to files from an ASP.NET Core app, consider using a third-party logging provider.

For information on `stdout` and debug logging with the ASP.NET Core Module, see Troubleshoot ASP.NET Core on Azure App Service and IIS and ASP.NET Core Module (ANCM) for IIS.

### `Console`

The `Console` provider logs output to the console. For more information on viewing `Console` logs in development, see the Logging output section.

### `Debug`

The `Debug` provider writes log output by using the `System.Diagnostics.Debug` class. Calls to `System.Diagnostics.Debug.WriteLine` write to the `Debug` provider.

On Linux, the `Debug` provider log location is distribution-dependent and may be one of the following:

* `/var/log/message`
* `/var/log/syslog`

### `EventSource`

`Microsoft.Extensions.Logging.EventSource.EventSourceLoggerProvider` writes to a cross-platform event source with the name `Microsoft-Extensions-Logging`. On Windows, the provider uses ETW.

#### `ServerReady` event to measure startup time

The ASP.NET Core hosting `System.Diagnostics.Tracing.EventSource` emits the `ServerReady` event in `Microsoft.AspNetCore.Hosting`, which represents the point where the server is ready to respond to requests and can be used to measure startup time.

#### `dotnet-trace` tooling

The `dotnet-trace` tool is a cross-platform CLI global tool that enables the collection of .NET traces of a running process. The tool collects `Microsoft.Extensions.Logging.EventSource` provider data using a `Microsoft.Extensions.Logging.EventSource.LoggingEventSource`.

For installation instructions, see `dotnet-trace`.

Use the `dotnet-trace` tooling to collect a trace from an app:

1. Run the app with the `dotnet run` command.
1. Determine the process identifier (PID) of the .NET app:

    ```dotnetcli
    dotnet-trace ps
    ```

   Find the PID for the process that has the same name as the app's assembly.

1. Execute the `dotnet-trace` command.

   General command syntax:

   * `{PID}`: Process identifier
   * `{KEYWORD}`: Keyword
   * `{PROVIDER LEVEL}`: Provider level
   * `{LOGGER CATEGORY ...}`: Logger category
   * `{CATEGORY LEVEL ...}`: Category level

   ```dotnetcli
   dotnet-trace collect -p {PID} 
       --providers Microsoft-Extensions-Logging:{KEYWORD}:{PROVIDER LEVEL}
           :FilterSpecs=\"
               {LOGGER CATEGORY 1}:{CATEGORY LEVEL 1};
               {LOGGER CATEGORY 2}:{CATEGORY LEVEL 2};
               ...
               {LOGGER CATEGORY N}:{CATEGORY LEVEL N}\"
   ```

   When using a PowerShell command shell, enclose the `--providers` value in single quotes (`'`):

   ```powershell
   dotnet-trace collect -p {PID} 
       --providers 'Microsoft-Extensions-Logging:{KEYWORD}:{PROVIDER LEVEL}
           :FilterSpecs=\"
               {LOGGER CATEGORY 1}:{CATEGORY LEVEL 1};
               {LOGGER CATEGORY 2}:{CATEGORY LEVEL 2};
               ...
               {LOGGER CATEGORY N}:{CATEGORY LEVEL N}\"'
   ```

   On non-Windows platforms, add the `-f speedscope` option to change the format of the output trace file to `speedscope`.

   The following table defines the keyword (`{KEYWORD}` placeholder).

   | Keyword | Description |
   | :-----: | ----------- |
   | 1       | Log meta events about the `LoggingEventSource`. Doesn't log events from `Microsoft.Extensions.Logging.ILogger`. |
   | 2       | Turns on the `Message` event when `ILogger.Log()` is called. Provides information in a programmatic (not formatted) way. |
   | 4       | Turns on the `FormatMessage` event when `ILogger.Log()` is called. Provides the formatted string version of the information. |
   | 8       | Turns on the `MessageJson` event when `ILogger.Log()` is called. Provides a JSON representation of the arguments. |

   The following table defines the provider levels.

   | Provider Level | Description     |
   | :------------: | --------------- |
   | 0              | `LogAlways`     |
   | 1              | `Critical`      |
   | 2              | `Error`         |
   | 3              | `Warning`       |
   | 4              | `Informational` |
   | 5              | `Verbose`       |

   The parsing for a category level can be either a string or a number, as indicated in the following table.

   | Category named value | Numeric value |
   | -------------------- | :-----------: |
   | `Trace`              | 0 |
   | `Debug`              | 1 |
   | `Information`        | 2 |
   | `Warning`            | 3 |
   | `Error`              | 4 |
   | `Critical`           | 5 |

   The provider level and category level:

   * Are in reverse order.
   * The string constants aren't all identical.

   If no `FilterSpecs` are specified, the `EventSourceLogger` implementation attempts to convert the provider level to a category level and applies it to all categories.

   | Provider Level     | Category Level   |
   | ------------------ | ---------------- |
   | `Verbose`(5)       | `Debug`(1)       |
   | `Informational`(4) | `Information`(2) |
   | `Warning`(3)       | `Warning`(3)     |
   | `Error`(2)         | `Error`(4)       |
   | `Critical`(1)      | `Critical`(5)    |

   If `FilterSpecs` are provided, any category that's included in the list uses the category level encoded there, all other categories are filtered out.

   The following examples assume:

   * An app is running and calling `Logger.LogDebug("12345")`.
   * The process ID (PID) is set via `set PID=12345`, where `12345` is the actual PID.

   Consider the following command:

   ```dotnetcli
   dotnet-trace collect -p %PID% --providers Microsoft-Extensions-Logging:4:5
   ```

   The preceding command:

   * Captures debug messages.
   * Doesn't apply a `FilterSpecs`.
   * Specifies level 5 which maps category `Microsoft.Extensions.Logging.LogLevel.Debug`.

   Consider the following command:

   ```dotnetcli
   dotnet-trace collect -p %PID%  --providers Microsoft-Extensions-Logging:4:5:\"FilterSpecs=*:5\"
   ```

   The preceding command:

   * Doesn't capture debug messages because the category level 5 is `Microsoft.Extensions.Logging.LogLevel.Critical`.
   * Provides a `FilterSpecs`.

   The following command captures debug messages because category level 1 specifies `Microsoft.Extensions.Logging.LogLevel.Debug`:

   ```dotnetcli
   dotnet-trace collect -p %PID%  --providers Microsoft-Extensions-Logging:4:5:\"FilterSpecs=*:1\"
   ```

   The following command captures debug messages because category specifies `Microsoft.Extensions.Logging.LogLevel.Debug`:

   ```dotnetcli
   dotnet-trace collect -p %PID%  --providers Microsoft-Extensions-Logging:4:5:\"FilterSpecs=*:Debug\"
   ```

   `FilterSpecs` entries for the logger category and category level represent additional log filtering conditions. Separate `FilterSpecs` entries with the `;` semicolon character.

   Example using a Windows command shell:

   ```dotnetcli
   dotnet-trace collect -p %PID% --providers Microsoft-Extensions-Logging:4:2:FilterSpecs=\"Microsoft.AspNetCore.Hosting*:4\"
   ```

   The preceding command activates:

   * The `EventSource` provider to produce formatted strings (`4`) for errors (`2`).
   * `Microsoft.AspNetCore.Hosting` logging at the `Microsoft.Extensions.Logging.LogLevel.Information` logging level (`4`).

1. Stop the `dotnet-trace` tooling by pressing the `Enter` key or `Ctrl`+`C`.

   The trace is saved with the name `trace.nettrace` in the folder where the `dotnet-trace` command is executed.

1. Open the trace with Perfview. Open the `trace.nettrace` file and explore the trace events.

If the app doesn't build the host with `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*`, add the `EventSource` provider to the app's logging configuration.

For more information, see:

* Trace for performance analysis utility (`dotnet-trace`) (.NET documentation)
* Trace for performance analysis utility (`dotnet-trace`) (`dotnet/diagnostics` GitHub repository documentation)
* `Microsoft.Extensions.Logging.EventSource.LoggingEventSource`
* `System.Diagnostics.Tracing.EventLevel`
* Perfview for viewing `EventSource` traces

#### Perfview

Use the PerfView utility to collect and view logs. There are other tools for viewing ETW logs, but PerfView provides the best experience for working with the ETW events emitted by ASP.NET Core.

To configure PerfView for collecting events logged by this provider, add the string `*Microsoft-Extensions-Logging` to the **Additional Providers** list. Don't miss the `*` at the start of the string.

### Windows EventLog

The Windows `EventLog` provider sends log output to the Windows Event Log. Unlike the other providers, the `EventLog` provider doesn't inherit the default non-provider settings. If `EventLog` log settings aren't specified, they default to `Microsoft.Extensions.Logging.LogLevel.Warning`.

To log events lower than `Microsoft.Extensions.Logging.LogLevel.Warning`, explicitly set the log level. The following example sets the Event Log default log level to `Microsoft.Extensions.Logging.LogLevel.Information`:

```json
"Logging": {
  "EventLog": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

`Microsoft.Extensions.Logging.EventLoggerFactoryExtensions.AddEventLog*` overloads can pass in `Microsoft.Extensions.Logging.EventLog.EventLogSettings`. If `null` or not specified, the following default settings are used:

* `LogName`: "`Application`"
* `SourceName`: "`.NET Runtime`"
* `MachineName`: The local machine name is used.

The following code changes the `SourceName` from the default value of `".NET Runtime"` to "`CustomLogs`":

```csharp
var builder = WebApplication.CreateBuilder();

builder.Logging.AddEventLog(eventLogSettings =>
{
    eventLogSettings.SourceName = "CustomLogs";
});
```

When the app calls the `Microsoft.Extensions.Logging.EventLoggerFactoryExtensions.AddEventLog*` overload with `Microsoft.Extensions.Logging.EventLog.EventLogSettings`, a new instance of `Microsoft.Extensions.Logging.EventLog.EventLogLoggerProvider` is created with the provided settings. If there's already an `Microsoft.Extensions.Logging.EventLog.EventLogLoggerProvider` instance registered, which is the case if the app doesn't call `Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders*` to remove all the `Microsoft.Extensions.Logging.ILoggerProvider` instances, the new settings don't replace the existing ones. If you want to ensure that the `Microsoft.Extensions.Logging.EventLog.EventLogSettings` are used, call `Microsoft.Extensions.Logging.LoggingBuilderExtensions.ClearProviders*` before calling `Microsoft.Extensions.Logging.EventLoggerFactoryExtensions.AddEventLog*`.

#### Azure App Service

The `Microsoft.Extensions.Logging.AzureAppServices` provider NuGet package writes logs to text files in an Azure App Service app's file system and to blob storage in an Azure Storage account. The provider only logs when the project runs in the Azure environment.

The provider package isn't included in the shared framework. To use the provider, add the provider package to the project.

To configure provider settings, use `Microsoft.Extensions.Logging.AzureAppServices.AzureFileLoggerOptions` and `Microsoft.Extensions.Logging.AzureAppServices.AzureBlobLoggerOptions`, as shown in the following example:

```csharp
using Microsoft.Extensions.Logging.AzureAppServices;

var builder = WebApplication.CreateBuilder();

builder.Logging.AddAzureWebAppDiagnostics();

builder.Services.Configure<AzureFileLoggerOptions>(options =>
{
    options.FileName = "azure-diagnostics-";
    options.FileSizeLimit = 50 * 1024;
    options.RetainedFileCountLimit = 5;
});

builder.Services.Configure<AzureBlobLoggerOptions>(options =>
{
    options.BlobName = "log.txt";
});
```

When deployed to Azure App Service, the app uses the settings in the App Service logs section of the **App Service** page of the Azure portal. When the following settings are updated, the changes take effect immediately without requiring a restart or redeployment of the app.

* **Application Logging (Filesystem)**
* **Application Logging (Blob)**

The default location for log files is `D:\home\LogFiles\Application`. The default file size limit is 10 MB, and the default maximum number of files retained is two files.

#### Azure log streaming

Azure log streaming supports viewing log activity in real time from:

* The app server
* The web server
* Failed request tracing

To configure Azure log streaming:

* Navigate to the **App Service logs** page from the app's portal page.
* Set **Application Logging (Filesystem)** to **On**.
* Choose the log **Level**. This setting only applies to Azure log streaming.

Navigate to the **Log Stream** page to view logs. The logged messages are logged with the `Microsoft.Extensions.Logging.ILogger` interface.

### Azure Application Insights

Application Insights is a service that monitors a web app and provides tools for querying and analyzing the telemetry data. If you use this provider, you can query and analyze your logs by using the Application Insights tools.

The `Microsoft.Extensions.Logging.ApplicationInsights` provider NuGet package writes logs to Azure Application Insights. The logging provider is included as a dependency of the `Microsoft.ApplicationInsights.AspNetCore` NuGet package, which is the package that provides all available telemetry for ASP.NET Core. If you use the `Microsoft.ApplicationInsights.AspNetCore` NuGet package, you aren't required to install the `Microsoft.Extensions.Logging.ApplicationInsights` provider package.

> **Note:**
> The `Microsoft.ApplicationInsights.Web` NuGet package is for ASP.NET 4.x, not ASP.NET Core, and shouldn't be used in an ASP.NET Core app.

For more information, see the following resources:

* Application Insights overview
* Application Insights for ASP.NET Core applications: Start here if you want to implement the full range of Application Insights telemetry along with logging.
* ApplicationInsightsLoggerProvider for .NET ILogger logs: Start here if you want to implement the logging provider without the rest of Application Insights telemetry.
* Application Insights logging adapters
* Install, configure, and initialize the Application Insights SDK interactive tutorial.
