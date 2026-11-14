---
title: "HostingHostBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostingHostBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostingHostBuilderExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class HostingHostBuilderExtensions
```

Provides extension methods for the `IHostBuilder` from the hosting package.

To be added.

## HostingHostBuilderExtensions.ConfigureAppConfiguration(IHostBuilder, IConfigurationBuilder>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureAppConfiguration (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Configuration.IConfigurationBuilder> configureDelegate);
```

Sets up the configuration for the remainder of the build process and application. This can be called multiple times and
the results will be additive. The results will be available at `HostBuilderContext.Configuration` for
subsequent operations, as well as in `IHost.Services`.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureDelegate`: The delegate for configuring the `IConfigurationBuilder` that will be used
to construct the `IConfiguration` for the host.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureContainer<TContainerBuilder>(IHostBuilder, Action<TContainerBuilder>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureContainer<TContainerBuilder> (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<TContainerBuilder> configureDelegate);
```

Enables configuring the instantiated dependency container. This can be called multiple times and
the results will be additive.

Parameters:

- `TContainerBuilder`: The type of builder.
- `hostBuilder`: The `IHostBuilder` to configure.
- `configureDelegate`: The delegate for configuring the `TContainerBuilder`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureDefaults(IHostBuilder, String[]) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureDefaults (this Microsoft.Extensions.Hosting.IHostBuilder builder, string[]? args);
```

Configures an existing `IHostBuilder` instance with pre-configured defaults. This will overwrite
previously configured values and is intended to be called before additional configuration calls.

Parameters:

- `builder`: The existing builder to configure.
- `args`: The command line args.

Returns: The same instance of the `IHostBuilder` for chaining.

The following defaults are applied to the `IHostBuilder`:
* set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
* load host `IConfiguration` from "DOTNET_" prefixed environment variables
* load host `IConfiguration` from supplied command line args
* load app `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
* load app `IConfiguration` from '[`IHostEnvironment.ApplicationName`].settings.json' and '[`IHostEnvironment.ApplicationName`].settings.[`IHostEnvironment.EnvironmentName`].json' when `IHostEnvironment.ApplicationName` is not empty
* load app `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
* load app `IConfiguration` from environment variables
* load app `IConfiguration` from supplied command line args
* configure the `ILoggerFactory` to log to the console, debug, and event source output
* enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## HostingHostBuilderExtensions.ConfigureHostOptions(IHostBuilder, HostOptions>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureHostOptions (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.Hosting.HostOptions> configureOptions);
```

Adds a delegate for configuring the `HostOptions` of the `IHost`.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureOptions`: The delegate for configuring the `HostOptions`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureHostOptions(IHostBuilder, HostOptions>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureHostOptions (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.HostOptions> configureOptions);
```

Adds a delegate for configuring the `HostOptions` of the `IHost`.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureOptions`: The delegate for configuring the `HostOptions`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureLogging(IHostBuilder, ILoggingBuilder>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureLogging (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.Logging.ILoggingBuilder> configureLogging);
```

Adds a delegate for configuring the provided `ILoggingBuilder`. This can be called multiple times.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureLogging`: The delegate that configures the `ILoggingBuilder`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureLogging(IHostBuilder, ILoggingBuilder>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureLogging (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Logging.ILoggingBuilder> configureLogging);
```

Adds a delegate for configuring the provided `ILoggingBuilder`. This can be called multiple times.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureLogging`: The delegate that configures the `ILoggingBuilder`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureMetrics(IHostBuilder, IMetricsBuilder>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureMetrics (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder> configureMetrics);
```

Adds a delegate for configuring the provided `IMetricsBuilder`. This can be called multiple times.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureMetrics`: The delegate that configures the `IMetricsBuilder`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureMetrics(IHostBuilder, IMetricsBuilder>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureMetrics (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder> configureMetrics);
```

Adds a delegate for configuring the provided `IMetricsBuilder`. This can be called multiple times.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureMetrics`: The delegate that configures the `IMetricsBuilder`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.ConfigureServices(IHostBuilder, IServiceCollection>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder ConfigureServices (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.DependencyInjection.IServiceCollection> configureDelegate);
```

Adds services to the container. This can be called multiple times and the results will be additive.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureDelegate`: The delegate for configuring the `IServiceCollection`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.RunConsoleAsync(IHostBuilder, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task RunConsoleAsync (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, System.Threading.CancellationToken <example-value> = default);
```

Enables console support, builds and starts the host, and waits for Ctrl+C or SIGTERM to shut down.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `cancellationToken`: A `CancellationToken` that can be used to cancel the console.

Returns: A `Task` that only completes when the token is triggered or shutdown is triggered.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HostingHostBuilderExtensions.RunConsoleAsync(IHostBuilder, ConsoleLifetimeOptions>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task RunConsoleAsync (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.ConsoleLifetimeOptions> configureOptions, System.Threading.CancellationToken <example-value> = default);
```

Enables console support, builds and starts the host, and waits for Ctrl+C or SIGTERM to shut down.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureOptions`: The delegate for configuring the `ConsoleLifetime`.
- `cancellationToken`: A `CancellationToken` that can be used to cancel the console.

Returns: A `Task` that only completes when the token is triggered or shutdown is triggered.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HostingHostBuilderExtensions.UseConsoleLifetime(IHostBuilder) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseConsoleLifetime (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder);
```

Listens for Ctrl+C or SIGTERM and calls `IHostApplicationLifetime.StopApplication` to start the shutdown process.
This will unblock extensions like RunAsync and WaitForShutdownAsync.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.UseConsoleLifetime(IHostBuilder, ConsoleLifetimeOptions>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseConsoleLifetime (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.ConsoleLifetimeOptions> configureOptions);
```

Listens for Ctrl+C or SIGTERM and calls `IHostApplicationLifetime.StopApplication` to start the shutdown process.
This will unblock extensions like RunAsync and WaitForShutdownAsync.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configureOptions`: The delegate for configuring the `ConsoleLifetime`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostingHostBuilderExtensions.UseContentRoot(IHostBuilder, String) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseContentRoot (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, string contentRoot);
```

Specifies the content root directory to be used by the host. To avoid the content root directory being
overwritten by a default value, ensure this is called after defaults are configured.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `contentRoot`: Path to root directory of the application.

Returns: The `IHostBuilder`.

To be added.

## HostingHostBuilderExtensions.UseDefaultServiceProvider(IHostBuilder, ServiceProviderOptions>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseDefaultServiceProvider (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.DependencyInjection.ServiceProviderOptions> configure);
```

Specifies the `IServiceProvider` to be the default one.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configure`: The delegate that configures the `IServiceProvider`.

Returns: The `IHostBuilder`.

To be added.

## HostingHostBuilderExtensions.UseDefaultServiceProvider(IHostBuilder, ServiceProviderOptions>) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseDefaultServiceProvider (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.DependencyInjection.ServiceProviderOptions> configure);
```

Specifies the `IServiceProvider` to be the default one.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `configure`: The delegate that configures the `IServiceProvider`.

Returns: The `IHostBuilder`.

To be added.

## HostingHostBuilderExtensions.UseEnvironment(IHostBuilder, String) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseEnvironment (this Microsoft.Extensions.Hosting.IHostBuilder hostBuilder, string environment);
```

Specifies the environment to be used by the host. To avoid the environment being overwritten by a default
value, ensure this is called after defaults are configured.

Parameters:

- `hostBuilder`: The `IHostBuilder` to configure.
- `environment`: The environment to host the application in.

Returns: The `IHostBuilder`.

To be added.
