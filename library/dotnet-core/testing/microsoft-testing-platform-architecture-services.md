---
title: "Microsoft.Testing.Platform services overview (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-services.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform services

The testing platform offers valuable services to both the testing framework and extension points. These services cater to common needs such as accessing the configuration, parsing and retrieving command-line arguments, obtaining the logging factory, and accessing the logging system, among others. `IServiceProvider` implements the _service locator pattern_ for the testing platform.

The `IServiceProvider` is derived directly from the base class library.

```csharp
namespace System
{
    public interface IServiceProvider
    {
        object? GetService(Type serviceType);
    }
}
```

The testing platform offers handy extension methods to access well-known service objects. All these methods are housed in a static class within the `Microsoft.Testing.Platform.Services` namespace.

```csharp
public static class ServiceProviderExtensions
{
    public static TService GetRequiredService<TService>(
        this IServiceProvider provider)

    public static TService? GetService<TService>(
        this IServiceProvider provider)

    public static IMessageBus GetMessageBus(
        this IServiceProvider serviceProvider)

    public static IConfiguration GetConfiguration(
        this IServiceProvider serviceProvider)

    public static ICommandLineOptions GetCommandLineOptions(
        this IServiceProvider serviceProvider)

    public static ILoggerFactory GetLoggerFactory(
        this IServiceProvider serviceProvider)

    public static IOutputDevice GetOutputDevice(
        this IServiceProvider serviceProvider)

    // ... and more
}
```

Most of the registration factories exposed by extension points provide access to the `IServiceProvider`: For example, when registering the testing framework, the `IServiceProvider` is passed as a parameter to the factory method.

```csharp
ITestApplicationBuilder RegisterTestFramework(
    Func<IServiceProvider, ITestFrameworkCapabilities> capabilitiesFactory,
    Func<ITestFrameworkCapabilities, IServiceProvider, ITestFramework> adapterFactory);
```

In the preceding code, both the `capabilitiesFactory` and the `adapterFactory` supply the `IServiceProvider` as a parameter.

Starting with MTP 2.5, use `GetRequiredPlatformService<TService>()` or `GetPlatformService<TService>()` when your project also imports `Microsoft.Extensions.DependencyInjection`. These names avoid ambiguity with the dependency-injection package's `GetRequiredService` and `GetService` extension methods. The required-service method throws when the platform service is absent; the optional-service method returns `null`.

## The `IConfiguration` service

The `IConfiguration` interface can be retrieved using the `IServiceProvider` and provides access to the configuration settings for the testing framework and any extension points. By default, these configurations are loaded from:

* Command-line options, exposed under the `commandLineOptions:` section.
* Environment variables.
* A JSON file named *[appname].testconfig.json* located next to the test application executable.

Command-line options take precedence over environment variables, which take precedence over values from *[appname].testconfig.json*. MTP loads every source and selects the first source that supplies each key. For `commandLineOptions:` values, MTP selects a source for the complete option so indexed arguments don't combine across sources. For details about configuration-file discovery and precedence, see MTP configuration settings.

The interface is a straightforward key-value pair of strings:

```csharp
public interface IConfiguration
{
    string? this[string key] { get; }
}
```

Starting with MTP 2.4.0, the configuration service also implements the `IConfigurationRoot` interface. Use `GetSection` to retrieve an `IConfigurationSection`, and use `GetChildren` to enumerate immediate child sections. A section exposes its `Key`, full `Path`, optional scalar `Value`, and `HasValue` state. Providers must implement `IHierarchicalConfigurationProvider` before their keys appear through enumeration, but you can retrieve a known path from any provider.

### JSON configuration file

The JSON file follows a hierarchical structure. To access child properties, you need to use the `:` separator. For example, consider a configuration for a potential testing framework like:

```json
{
  "CustomTestingFramework": {
    "DisableParallelism": true
  }
}
```

The code snippet would look something like this:

```csharp
IServiceProvider serviceProvider = null; // Get the service provider...

var configuration = serviceProvider.GetConfiguration();

if (bool.TryParse(configuration["CustomTestingFramework:DisableParallelism"], out var value) && value is true)
{
    // ...
}
```

In the case of an array, such as:

```json
{
  "CustomTestingFramework": {
    "Engine": [
      "ThreadPool",
      "CustomThread"
    ]
  }
}
```

The syntax to access to the fist element ("ThreadPool") is:

```csharp
IServiceProvider serviceProvider = null; // Get the service provider...

var configuration = serviceProvider.GetConfiguration();

var fistElement = configuration["CustomTestingFramework:Engine:0"];
```

### Environment variables

The `:` separator doesn't work with environment variable hierarchical keys on all platforms. `__`, the double underscore, is:

* Supported by all platforms. For example, the `:` separator is not supported by Bash, but `__` is.
* Automatically replaced by a `:`

For instance, the environment variable can be set as follows (This example is applicable for Windows):

```bash
setx CustomTestingFramework__DisableParallelism=True
```

You can choose not to use the environment variable configuration source when creating the `ITestApplicationBuilder`:

```csharp
var options = new TestApplicationOptions();

options.Configuration.ConfigurationSources.RegisterEnvironmentVariablesConfigurationSource = false;

var builder = await TestApplication.CreateBuilderAsync(args, options);
```

## The `ICommandLineOptions` service

The `ICommandLineOptions` service is utilized to fetch details regarding the command-line options that the platform has parsed. The APIs available include:

```csharp
public interface ICommandLineOptions
{
    bool IsOptionSet(string optionName);

    bool TryGetOptionArgumentList(
        string optionName, 
        out string[]? arguments);
}
```

The `ICommandLineOptions` can be obtained through certain APIs, such as the ICommandLineOptionsProvider, or you can retrieve an instance of it from the IServiceProvider via the extension method `serviceProvider.GetCommandLineOptions()`.

`ICommandLineOptions.IsOptionSet(string optionName)`: This method allows you to verify whether a specific option has been specified. When specifying the `optionName`, omit the `--` prefix. For example, if the user inputs `--myOption`, you should simply pass `myOption`.

`ICommandLineOptions.TryGetOptionArgumentList(string optionName, out string[]? arguments)`: This method enables you to check whether a specific option has been set and, if so, retrieve the corresponding value or values (if the arity is more than one). Similar to the previous case, the `optionName` should be provided without the `--` prefix.

## The `IArtifactNamingService` service

Starting with MTP 2.4.0, `IArtifactNamingService` gives extensions the same cross-platform file-name templating that MTP report extensions use. Retrieve it with `serviceProvider.GetArtifactNamingService()`, then call `ResolveFileName` with a template.

The service expands `{pname}`, `{pid}`, `{asm}`, `{tfm}`, `{arch}`, and `{time}`. It preserves directory segments and sanitizes the leaf file name for the current operating system. Unknown placeholders remain unchanged. For placeholder descriptions, see Report file names.

## The `ILoggerFactory` service

The testing platform comes with an integrated logging system that generates a log file. You can view the logging options by running the `--help` command.
The options you can choose from include:

```dotnetcli
--diagnostic                             Enable the diagnostic logging. The default log level is 'Trace'. The file will be written in the output directory with the name log_[MMddHHssfff].diag
--diagnostic-synchronous-write Force the built-in file logger to write the log synchronously. Useful for scenario where you don't want to lose any log (i.e. in case of crash). Note that this is slowing down the test execution.
--diagnostic-output-directory            Output directory of the diagnostic logging, if not specified the file will be generated inside the default 'TestResults' directory.
--diagnostic-file-prefix           Prefix for the log file name that will replace '[log]_.'
--diagnostic-verbosity                   Define the level of the verbosity for the --diagnostic. The available values are 'Trace', 'Debug', 'Information', 'Warning', 'Error', and 'Critical'
```

From a coding standpoint, to log information, you need to obtain the `ILoggerFactory` from the `IServiceProvider`.
The `ILoggerFactory` API is as follows:

```csharp
public interface ILoggerFactory
{
    ILogger CreateLogger(string categoryName);
}

public static class LoggerFactoryExtensions
{
    public static ILogger<TCategoryName> CreateLogger<TCategoryName>(this ILoggerFactory factory);
}
```

The logger factory allows you to create an `ILogger` object using the `CreateLogger` API. There's also a convenient API that accepts a generic argument, which will be used as the category name.

```csharp
public interface ILogger
{
    Task LogAsync<TState>(
        LogLevel logLevel, 
        TState state, 
        Exception? exception, 
        Func<TState, Exception?, string> formatter);

    void Log<TState>(
        LogLevel logLevel,
        TState state, 
        Exception? exception, 
        Func<TState, Exception?, string> formatter);

    bool IsEnabled(LogLevel logLevel);
}

public interface ILogger<out TCategoryName> : ILogger
{
}

public static class LoggingExtensions
{
    public static Task LogCriticalAsync(this ILogger logger, string message);
    public static Task LogDebugAsync(this ILogger logger, string message);
    public static Task LogErrorAsync(this ILogger logger, Exception ex);
    public static Task LogErrorAsync(this ILogger logger, string message, Exception ex);
    public static Task LogErrorAsync(this ILogger logger, string message);
    public static Task LogInformationAsync(this ILogger logger, string message);
    public static Task LogTraceAsync(this ILogger logger, string message);
    public static Task LogWarningAsync(this ILogger logger, string message);
    public static void LogCritical(this ILogger logger, string message);
    public static void LogDebug(this ILogger logger, string message);
    public static void LogError(this ILogger logger, Exception ex);
    public static void LogError(this ILogger logger, string message, Exception ex);
    public static void LogError(this ILogger logger, string message);
    public static void LogInformation(this ILogger logger, string message);
    public static void LogTrace(this ILogger logger, string message);
    public static void LogWarning(this ILogger logger, string message);
}
```

The `ILogger` object, which is created by the `ILoggerFactory`, offers APIs for logging information at various levels. These logging levels include:

```csharp
public enum LogLevel
{
    Trace,
    Debug,
    Information,
    Warning,
    Error,
    Critical,
    None,
}
```

Here's an example of how you might use the logging API:

```csharp
...
IServiceProvider provider = null; // Get the service provider...

var factory = provider.GetLoggerFactory();

var logger = factory.CreateLogger<TestingFramework>();

// ...

if (logger.IsEnabled(LogLevel.Information))
{
    await logger.LogInformationAsync(
        $"Executing request of type '{context.Request}'");
}

// ...
```

Keep in mind that to prevent unnecessary allocation, you should check if the level is *enabled* using the `ILogger.IsEnabled(LogLevel)` API.

## The `IDiagnosticLoggingInformation` service

Starting with MTP 2.5 preview, call `serviceProvider.GetDiagnosticLoggingInformation()` to retrieve experimental information about the built-in diagnostic file logger. The method returns `null` when diagnostic logging isn't enabled.

The `IDiagnosticLoggingInformation` service exposes:

- `LogFile`, the file that currently receives diagnostic entries.
- `LogLevel`, the minimum level written to the file.
- `SynchronousWrite`, which indicates whether the file logger writes entries synchronously.

The service is live. During test application construction, MTP can relocate the log to the effective results directory. Retain the service and read `LogFile` when you need the path instead of caching the first `FileInfo`. If log recovery leaves a partial file in the original location, `LogFile` identifies the replacement file that receives new entries.

> **Important:**
> This API uses the `TPEXP` diagnostic ID and might change or be removed in a future release.
