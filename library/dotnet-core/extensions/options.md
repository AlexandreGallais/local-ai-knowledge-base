---
title: "Options pattern (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/options.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options pattern in .NET

The options pattern uses classes to provide strongly typed access to groups of related settings. When configuration settings are isolated by scenario into separate classes, the app adheres to two important software engineering principles:

- The Interface Segregation Principle (ISP) or Encapsulation: Scenarios (classes) that depend on configuration settings depend only on the configuration settings that they use.
- Separation of Concerns: Settings for different parts of the app aren't dependent or coupled with one another.

Options also provide a mechanism to validate configuration data. For more information, see the Options validation section.

## Bind hierarchical configuration

The preferred way to read related configuration values is using the options pattern. The options pattern is possible through the `Microsoft.Extensions.Options.IOptions`1` interface, where the generic type parameter `TOptions` is constrained to a `class`. The `IOptions<TOptions>` can later be provided through dependency injection. For more information, see Dependency injection in .NET.

For example, to read the highlighted configuration values from an _appsettings.json_ file:

```json
﻿{
    "SecretKey": "Secret key value",
    "TransientFaultHandlingOptions": {
        "Enabled": true,
        "AutoRetryDelay": "00:00:07"
    },
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    }
}
```
Create the following `TransientFaultHandlingOptions` class:

```csharp
public sealed class TransientFaultHandlingOptions
{
    public bool Enabled { get; set; }
    public TimeSpan AutoRetryDelay { get; set; }
}
```

When using the options pattern, an options class:

- Must be non-abstract with a public parameterless constructor
- Contain public read-write properties to bind (fields are ***not*** bound)

The following code is part of the _Program.cs_ C# file and:

* Calls ConfigurationBinder.Bind to bind the `TransientFaultHandlingOptions` class to the `"TransientFaultHandlingOptions"` section.
* Displays the configuration data.

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ConsoleJson.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.Sources.Clear();

IHostEnvironment env = builder.Environment;

builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true);

TransientFaultHandlingOptions options = new();
builder.Configuration.GetSection(nameof(TransientFaultHandlingOptions))
    .Bind(options);

Console.WriteLine($"TransientFaultHandlingOptions.Enabled={options.Enabled}");
Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={options.AutoRetryDelay}");

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();

// <Output>
// Sample output:
```
In the preceding code, the JSON configuration file has its `"TransientFaultHandlingOptions"` section bound to the `TransientFaultHandlingOptions` instance. This hydrates the C# objects properties with those corresponding values from the configuration.

`ConfigurationBinder.Get<T>` binds and returns the specified type. `ConfigurationBinder.Get<T>` may be more convenient than using `ConfigurationBinder.Bind`. The following code shows how to use `ConfigurationBinder.Get<T>` with the `TransientFaultHandlingOptions` class:

```csharp
var options =
    builder.Configuration.GetSection(nameof(TransientFaultHandlingOptions))
        .Get<TransientFaultHandlingOptions>();

Console.WriteLine($"TransientFaultHandlingOptions.Enabled={options.Enabled}");
Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={options.AutoRetryDelay}");
```

In the preceding code, the `ConfigurationBinder.Get<T>` is used to acquire an instance of the `TransientFaultHandlingOptions` object with its property values populated from the underlying configuration.

> **Important:**
> The `Microsoft.Extensions.Configuration.ConfigurationBinder` class exposes several APIs, such as `.Bind(object instance)` and `.Get<T>()` that are ***not*** constrained to `class`. When using any of the Options interfaces, you must adhere to aforementioned options class constraints.

An alternative approach when using the options pattern is to bind the `"TransientFaultHandlingOptions"` section and add it to the dependency injection service container. In the following code, `TransientFaultHandlingOptions` is added to the service container with `Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*` and bound to configuration:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<TransientFaultHandlingOptions>(
    builder.Configuration.GetSection(
        key: nameof(TransientFaultHandlingOptions)));
```

The `builder` in the preceding example is an instance of `Microsoft.Extensions.Hosting.HostApplicationBuilder`.

> **Tip:**
> The `key` parameter is the name of the configuration section to search for. It does *not* have to match the name of the type that represents it. For example, you could have a section named `"FaultHandling"` and it could be represented by the `TransientFaultHandlingOptions` class. In this instance, you'd pass `"FaultHandling"` to the `Microsoft.Extensions.Configuration.IConfiguration.GetSection*` function instead. The `nameof` operator is used as a convenience when the named section matches the type it corresponds to.

Using the preceding code, the following code reads the position options:

```csharp
﻿using Microsoft.Extensions.Options;

namespace ConsoleJson.Example;

public sealed class ExampleService(IOptions<TransientFaultHandlingOptions> options)
{
    private readonly TransientFaultHandlingOptions _options = options.Value;

    public void DisplayValues()
    {
        Console.WriteLine($"TransientFaultHandlingOptions.Enabled={_options.Enabled}");
        Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={_options.AutoRetryDelay}");
    }
}
```
In the preceding code, changes to the JSON configuration file after the app has started are ***not*** read. To read changes after the app has started, use IOptionsSnapshot or IOptionsMonitor to monitor changes as they occur, and react accordingly.

## Options interfaces

`Microsoft.Extensions.Options.IOptions`1`:

- Does ***not*** support:
  - Reading of configuration data after the app has started.
  - Named options
- Is registered as a Singleton and can be injected into any service lifetime.

`Microsoft.Extensions.Options.IOptionsSnapshot`1`:

- Is useful in scenarios where options should be recomputed on every injection resolution, in scoped or transient lifetimes. For more information, see Use IOptionsSnapshot to read updated data.
- Is registered as Scoped and therefore can't be injected into a Singleton service.
- Supports named options.

`Microsoft.Extensions.Options.IOptionsMonitor`1`:

- Is used to retrieve options and manage options notifications for `TOptions` instances.
- Is registered as a Singleton and can be injected into any service lifetime.
- Supports:
  - Change notifications
  - Named options
  - Reloadable configuration
  - Selective options invalidation (`Microsoft.Extensions.Options.IOptionsMonitorCache`1`)

`Microsoft.Extensions.Options.IOptionsFactory`1` is responsible for creating new options instances. It has a single `Microsoft.Extensions.Options.IOptionsFactory`1.Create*` method. The default implementation takes all registered `Microsoft.Extensions.Options.IConfigureOptions`1` and `Microsoft.Extensions.Options.IPostConfigureOptions`1` and runs all the configurations first, followed by the post-configuration. It distinguishes between `Microsoft.Extensions.Options.IConfigureNamedOptions`1` and `Microsoft.Extensions.Options.IConfigureOptions`1` and only calls the appropriate interface.

`Microsoft.Extensions.Options.IOptionsMonitorCache`1` is used by `Microsoft.Extensions.Options.IOptionsMonitor`1` to cache `TOptions` instances. The `Microsoft.Extensions.Options.IOptionsMonitorCache`1` invalidates options instances in the monitor so that the value is recomputed (`Microsoft.Extensions.Options.IOptionsMonitorCache`1.TryRemove*`). Values can be manually introduced with `Microsoft.Extensions.Options.IOptionsMonitorCache`1.TryAdd*`. The `Microsoft.Extensions.Options.IOptionsMonitorCache`1.Clear*` method is used when all named instances should be recreated on demand.

`Microsoft.Extensions.Options.IOptionsChangeTokenSource`1` is used to fetch the `Microsoft.Extensions.Primitives.IChangeToken` that tracks changes to the underlying `TOptions` instance. For more information on change-token primitives, see Change notifications.

### Options interfaces benefits

Using a generic wrapper type gives you the ability to decouple the lifetime of the option from the dependency injection (DI) container. The `Microsoft.Extensions.Options.IOptions`1.Value` interface provides a layer of abstraction, including generic constraints, on your options type. This provides the following benefits:

- The evaluation of the `T` configuration instance is deferred to the accessing of `Microsoft.Extensions.Options.IOptions`1.Value`, rather than when it is injected. This is important because you can consume the `T` option from various places and choose the lifetime semantics without changing anything about `T`.
- When registering options of type `T`, you don't need to explicitly register the `T` type. This is a convenience when you're authoring a library with simple defaults, and you don't want to force the caller to register options into the DI container with a specific lifetime.
- From the perspective of the API, it allows for constraints on the type `T` (in this case, `T` is constrained to a reference type).

## Use IOptionsSnapshot to read updated data

When you use `Microsoft.Extensions.Options.IOptionsSnapshot`1`, options are computed once per request when accessed and are cached for the lifetime of the request. Changes to the configuration are read after the app starts when using configuration providers that support reading updated configuration values.

The difference between `IOptionsMonitor` and `IOptionsSnapshot` is that:

- `IOptionsMonitor` is a singleton service that retrieves current option values at any time, which is especially useful in singleton dependencies.
- `IOptionsSnapshot` is a scoped service and provides a snapshot of the options at the time the `IOptionsSnapshot<T>` object is constructed. Options snapshots are designed for use with transient and scoped dependencies.

The following code uses `Microsoft.Extensions.Options.IOptionsSnapshot`1`.

```csharp
﻿using Microsoft.Extensions.Options;

namespace ConsoleJson.Example;

public sealed class ScopedService(IOptionsSnapshot<TransientFaultHandlingOptions> options)
{
    private readonly TransientFaultHandlingOptions _options = options.Value;

    public void DisplayValues()
    {
        Console.WriteLine($"TransientFaultHandlingOptions.Enabled={_options.Enabled}");
        Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={_options.AutoRetryDelay}");
    }
}
```
The following code registers a configuration instance which `TransientFaultHandlingOptions` binds against:

```csharp
builder.Services
    .Configure<TransientFaultHandlingOptions>(
        configurationRoot.GetSection(
            nameof(TransientFaultHandlingOptions)));
```

In the preceding code, the `Configure<TOptions>` method is used to register a configuration instance that `TOptions` will bind against, and updates the options when the configuration changes.

## IOptionsMonitor

The `IOptionsMonitor` type supports change notifications and enables scenarios where your app may need to respond to configuration source changes dynamically. This is useful when you need to react to changes in configuration data after the app has started. Change notifications are only supported for file-system based configuration providers, such as the following:

- Microsoft.Extensions.Configuration.Ini
- Microsoft.Extensions.Configuration.Json
- Microsoft.Extensions.Configuration.KeyPerFile
- Microsoft.Extensions.Configuration.UserSecrets
- Microsoft.Extensions.Configuration.Xml

To use the options monitor, options objects are configured in the same way from a configuration section.

```csharp
builder.Services
    .Configure<TransientFaultHandlingOptions>(
        configurationRoot.GetSection(
            nameof(TransientFaultHandlingOptions)));
```

The following example uses `Microsoft.Extensions.Options.IOptionsMonitor`1`:

```csharp
﻿using Microsoft.Extensions.Options;

namespace ConsoleJson.Example;

public sealed class MonitorService(IOptionsMonitor<TransientFaultHandlingOptions> monitor)
{
    public void DisplayValues()
    {
        TransientFaultHandlingOptions options = monitor.CurrentValue;

        Console.WriteLine($"TransientFaultHandlingOptions.Enabled={options.Enabled}");
        Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={options.AutoRetryDelay}");
    }
}
```
In the preceding code, changes to the JSON configuration file after the app has started are read.

> **Tip:**
> Some file systems, such as Docker containers and network shares, may not reliably send change notifications. When using the `Microsoft.Extensions.Options.IOptionsMonitor`1` interface in these environments, set the `DOTNET_USE_POLLING_FILE_WATCHER` environment variable to `1` or `true` to poll the file system for changes. The interval at which changes are polled is every four seconds and isn't configurable.
>
> For more information on Docker containers, see Containerize a .NET app.
