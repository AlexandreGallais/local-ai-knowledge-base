---
title: "Detect changes with change tokens in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/change-tokens.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Detect changes with change tokens in ASP.NET Core

-->
-->

A *change token* is a general-purpose, low-level building block used to track state changes.

View or download sample code (how to download)

## IChangeToken interface

`Microsoft.Extensions.Primitives.IChangeToken` propagates notifications that a change has occurred. `IChangeToken` resides in the `Microsoft.Extensions.Primitives` namespace. The Microsoft.Extensions.Primitives NuGet package is implicitly provided to the ASP.NET Core apps.

`IChangeToken` has two properties:

* `Microsoft.Extensions.Primitives.IChangeToken.ActiveChangeCallbacks` indicate if the token proactively raises callbacks. If `ActiveChangedCallbacks` is set to `false`, a callback is never called, and the app must poll `HasChanged` for changes. It's also possible for a token to never be cancelled if no changes occur or the underlying change listener is disposed or disabled.
* `Microsoft.Extensions.Primitives.IChangeToken.HasChanged` receives a value that indicates if a change has occurred.

The `IChangeToken` interface includes the RegisterChangeCallback(Action\<Object>, Object) method, which registers a callback that's invoked when the token has changed. `HasChanged` must be set before the callback is invoked.

## ChangeToken class

`Microsoft.Extensions.Primitives.ChangeToken` is a static class used to propagate notifications that a change has occurred. `ChangeToken` resides in the `Microsoft.Extensions.Primitives` namespace. The Microsoft.Extensions.Primitives NuGet package is implicitly provided to the ASP.NET Core apps.

The ChangeToken.OnChange(Func\<IChangeToken>, Action) method registers an `Action` to call whenever the token changes:

* `Func<IChangeToken>` produces the token.
* `Action` is called when the token changes.

The ChangeToken.OnChange\<TState>(Func\<IChangeToken>, Action\<TState>, TState) overload takes an additional `TState` parameter that's passed into the token consumer `Action`.

`OnChange` returns an `System.IDisposable`. Calling `System.IDisposable.Dispose*` stops the token from listening for further changes and releases the token's resources.

## Example uses of change tokens in ASP.NET Core

Change tokens are used in prominent areas of ASP.NET Core to monitor for changes to objects:

* For monitoring changes to files, `Microsoft.Extensions.FileProviders.IFileProvider`'s `Microsoft.Extensions.FileProviders.IFileProvider.Watch*` method creates an `IChangeToken` for the specified files or folder to watch.
* `IChangeToken` tokens can be added to cache entries to trigger cache evictions on change.
* For `TOptions` changes, the default `Microsoft.Extensions.Options.OptionsMonitor`1` implementation of `Microsoft.Extensions.Options.IOptionsMonitor`1` has an overload that accepts one or more `Microsoft.Extensions.Options.IOptionsChangeTokenSource`1` instances. Each instance returns an `IChangeToken` to register a change notification callback for tracking options changes.

## Monitor for configuration changes

By default, ASP.NET Core templates use JSON configuration files (`appsettings.json`, `appsettings.Development.json`, and `appsettings.Production.json`) to load app configuration settings.

These files are configured using the AddJsonFile(IConfigurationBuilder, String, Boolean, Boolean) extension method on `Microsoft.Extensions.Configuration.ConfigurationBuilder` that accepts a `reloadOnChange` parameter. `reloadOnChange` indicates if configuration should be reloaded on file changes. This setting appears in the `Microsoft.Extensions.Hosting.Host` convenience method `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*`:

```csharp
config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
      .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, 
          reloadOnChange: true);
```

File-based configuration is represented by `Microsoft.Extensions.Configuration.FileConfigurationSource`. `FileConfigurationSource` uses `Microsoft.Extensions.FileProviders.IFileProvider` to monitor files.

By default, the `IFileMonitor` is provided by a `Microsoft.Extensions.FileProviders.PhysicalFileProvider`, which uses `System.IO.FileSystemWatcher` to monitor for configuration file changes.

The sample app demonstrates two implementations for monitoring configuration changes. If any of the `appsettings` files change, both of the file monitoring implementations execute custom code—the sample app writes a message to the console.

A configuration file's `FileSystemWatcher` can trigger multiple token callbacks for a single configuration file change. To ensure that the custom code is only run once when multiple token callbacks are triggered, the sample's implementation checks file hashes. The sample uses SHA1 file hashing. A retry is implemented with an exponential back-off.

`Utilities/Utilities.cs`:

```csharp
public static byte[] ComputeHash(string filePath)
{
    var runCount = 1;

    while(runCount < 4)
    {
        try
        {
            if (File.Exists(filePath))
            {
                using (var fs = File.OpenRead(filePath))
                {
                    return System.Security.Cryptography.SHA1
                        .Create().ComputeHash(fs);
                }
            }
            else 
            {
                throw new FileNotFoundException();
            }
        }
        catch (IOException ex)
        {
            if (runCount == 3)
            {
                throw;
            }

            Thread.Sleep(TimeSpan.FromSeconds(Math.Pow(2, runCount)));
            runCount++;
        }
    }

    return new byte[20];
}
```

### Simple startup change token

Register a token consumer `Action` callback for change notifications to the configuration reload token.

In `Startup.Configure`:

```csharp
ChangeToken.OnChange(
    () => config.GetReloadToken(),
    (state) => InvokeChanged(state),
    env);
```

`config.GetReloadToken()` provides the token. The callback is the `InvokeChanged` method:

```csharp
private void InvokeChanged(IWebHostEnvironment env)
{
    byte[] appsettingsHash = ComputeHash("appSettings.json");
    byte[] appsettingsEnvHash = 
        ComputeHash($"appSettings.{env.EnvironmentName}.json");

    if (!_appsettingsHash.SequenceEqual(appsettingsHash) || 
        !_appsettingsEnvHash.SequenceEqual(appsettingsEnvHash))
    {
        _appsettingsHash = appsettingsHash;
        _appsettingsEnvHash = appsettingsEnvHash;

        WriteConsole("Configuration changed (Simple Startup Change Token)");
    }
}
```

The `state` of the callback is used to pass in the `IWebHostEnvironment`, which is useful for specifying the correct `appsettings` configuration file to monitor (for example, `appsettings.Development.json` when in the `Development` environment). File hashes are used to prevent the `WriteConsole` statement from running multiple times due to multiple token callbacks when the configuration file has only changed once.

This system runs as long as the app is running and can't be disabled by the user.

### Monitor configuration changes as a service

The sample implements:

* Basic startup token monitoring.
* Monitoring as a service.
* A mechanism to enable and disable monitoring.

The sample establishes an `IConfigurationMonitor` interface.

`Extensions/ConfigurationMonitor.cs`:

```csharp
public interface IConfigurationMonitor
{
    bool MonitoringEnabled { get; set; }
    string CurrentState { get; set; }
}
```

The constructor of the implemented class, `ConfigurationMonitor`, registers a callback for change notifications:

```csharp
public ConfigurationMonitor(IConfiguration config, IWebHostEnvironment env)
{
    _env = env;

    ChangeToken.OnChange<IConfigurationMonitor>(
        () => config.GetReloadToken(),
        InvokeChanged,
        this);
}

public bool MonitoringEnabled { get; set; } = false;
public string CurrentState { get; set; } = "Not monitoring";
```

`config.GetReloadToken()` supplies the token. `InvokeChanged` is the callback method. The `state` in this instance is a reference to the `IConfigurationMonitor` instance that's used to access the monitoring state. Two properties are used:

* `MonitoringEnabled`: Indicates if the callback should run its custom code.
* `CurrentState`: Describes the current monitoring state for use in the UI.

The `InvokeChanged` method is similar to the earlier approach, except that it:

* Doesn't run its code unless `MonitoringEnabled` is `true`.
* Outputs the current `state` in its `WriteConsole` output.

```csharp
private void InvokeChanged(IConfigurationMonitor state)
{
    if (MonitoringEnabled)
    {
        byte[] appsettingsHash = ComputeHash("appSettings.json");
        byte[] appsettingsEnvHash = 
            ComputeHash($"appSettings.{_env.EnvironmentName}.json");

        if (!_appsettingsHash.SequenceEqual(appsettingsHash) || 
            !_appsettingsEnvHash.SequenceEqual(appsettingsEnvHash))
        {
            string message = $"State updated at {DateTime.Now}";
          

            _appsettingsHash = appsettingsHash;
            _appsettingsEnvHash = appsettingsEnvHash;

            WriteConsole("Configuration changed (ConfigurationMonitor Class) " +
                $"{message}, state:{state.CurrentState}");
        }
    }
}
```

An instance `ConfigurationMonitor` is registered as a service in `Startup.ConfigureServices`:

```csharp
services.AddSingleton<IConfigurationMonitor, ConfigurationMonitor>();
```

The Index page offers the user control over configuration monitoring. The instance of `IConfigurationMonitor` is injected into the `IndexModel`.

`Pages/Index.cshtml.cs`:

```csharp
public IndexModel(
    IConfiguration config, 
    IConfigurationMonitor monitor, 
    FileService fileService)
{
    _config = config;
    _monitor = monitor;
    _fileService = fileService;
}
```

The configuration monitor (`_monitor`) is used to enable or disable monitoring and set the current state for UI feedback:

```csharp
public IActionResult OnPostStartMonitoring()
{
    _monitor.MonitoringEnabled = true;
    _monitor.CurrentState = "Monitoring!";

    return RedirectToPage();
}

public IActionResult OnPostStopMonitoring()
{
    _monitor.MonitoringEnabled = false;
    _monitor.CurrentState = "Not monitoring";

    return RedirectToPage();
}
```

When `OnPostStartMonitoring` is triggered, monitoring is enabled, and the current state is cleared. When `OnPostStopMonitoring` is triggered, monitoring is disabled, and the state is set to reflect that monitoring isn't occurring.

Buttons in the UI enable and disable monitoring.

`Pages/Index.cshtml`:

```cshtml
<button class="btn btn-success" asp-page-handler="StartMonitoring">
    Start Monitoring
</button>

<button class="btn btn-danger" asp-page-handler="StopMonitoring">
    Stop Monitoring
</button>
```
