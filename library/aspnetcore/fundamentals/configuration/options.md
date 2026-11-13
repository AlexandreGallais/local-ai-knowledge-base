---
title: "Options pattern in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/configuration/options.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

---
title: Options pattern in ASP.NET Core
ai-usage: ai-assisted
description: Discover how to use the options pattern to represent groups of related settings in ASP.NET Core apps.
monikerRange: '>= aspnetcore-3.1'
ms.date: 09/21/2026
---
# Options pattern in ASP.NET Core

-->
-->

The options pattern uses classes to provide strongly typed access to groups of related settings. When configuration settings are isolated by scenario into separate classes, the app adheres to two important software engineering principles:

* Encapsulation: Classes that depend on configuration settings depend only on the configuration settings that they use.
* Separation of Concerns: Settings for different parts of the app aren't dependent or coupled to one another.

Options also provide a mechanism to validate configuration data, which is described in the Options validation section.

This article provides information on the options pattern in ASP.NET Core. For information on using the options pattern in console apps, see Options pattern in .NET.

The examples in this article rely on a general understanding of injecting services into classes. For more information, see Dependency injection in ASP.NET Core. Examples are based on Blazor's Razor components. To see Razor Pages examples, see the 7.0 version of this article. The examples in the .NET 8 or later versions of this article use primary constructors (Primary constructors (C# Guide)) and nullable reference types (NRTs) with .NET compiler null-state static analysis.

## How to use the options pattern

Consider the following JSON configuration data from an app settings file (for example, `appsettings.json`), which includes related data for an employee's name and title in an organization's position:

```json
"Position": {
  "Name": "Joe Smith",
  "Title": "Editor"
}
```

The following `PositionOptions` options class:

* Is a POCO, a simple .NET class with properties. An options class must not be an abstract class.
* Has public read-write properties that match corresponding entries in the configuration data.
* Does ***not*** have its field (`Position`) bound. The `Position` field is used to avoid hardcoding the string `"Position"` in the app when binding the class to a configuration provider.

`PositionOptions.cs`:

```csharp
public class PositionOptions
{
    public const string Position = "Position";

    public string? Name { get; set; }
    public string? Title { get; set; }
}
```

The following example:

* Calls `Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*` to bind the `PositionOptions` class to the `Position` section.
* Displays the `Position` configuration data.

`BasicOptions.razor`:

```razor
@page "/basic-options"
@inject IConfiguration Config

Name: @positionOptions?.Name<br>
Title: @positionOptions?.Title

@code {
    private PositionOptions? positionOptions;

    protected override void OnInitialized()
    {
        positionOptions = new PositionOptions();
        Config.GetSection(PositionOptions.Position).Bind(positionOptions);
    }
}
```

Output:

> :::no-loc text="Name: Joe Smith":::
> :::no-loc text="Title: Editor":::

After the app has started, changes to the JSON configuration in the app settings file are read. To demonstrate the behavior, change one or both configuration values in the app settings file and reload the page without restarting the app.

`Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*` allows an abstract class to be instantiated. Consider the following example that uses the abstract class `AbstractClassWithName`.

`NameTitleOptions.cs`:

```csharp
public abstract class AbstractClassWithName
{
    public abstract string? Name { get; set; }
}

public class NameTitleOptions(int age) : AbstractClassWithName
{
    public const string NameTitle = "NameTitle";

    public override string? Name { get; set; }
    public string? Title { get; set; }
    public int Age { get; set; } = age;
}
```

JSON configuration:

```json
"NameTitle": {
  "Name": "Sally Jones",
  "Title": "Writer"
}
```

The following example displays the `NameTitleOptions` configuration values.

`AbstractClassOptions.razor`:

```razor
@page "/abstract-class-options"
@inject IConfiguration Config

Name: @nameTitleOptions?.Name<br>
Title: @nameTitleOptions?.Title<br>
Age: @nameTitleOptions?.Age

@code {
    private NameTitleOptions? nameTitleOptions;

    protected override void OnInitialized()
    {
        nameTitleOptions = new NameTitleOptions(22);
        Config.GetSection(NameTitleOptions.NameTitle).Bind(nameTitleOptions);
    }
}
```

Output:

> :::no-loc text="Name: Sally Jones":::
> :::no-loc text="Title: Writer":::
> :::no-loc text="Age: 22":::

`Microsoft.Extensions.Configuration.ConfigurationBinder.Get*` binds and returns the specified type. The following example shows how to use `Microsoft.Extensions.Configuration.ConfigurationBinder.Get*` with the `PositionOptions` class.

`GetOptions.razor`:

```razor
@page "/get-options"
@inject IConfiguration Config

Name: @positionOptions?.Name<br>
Title: @positionOptions?.Title

@code {
    private PositionOptions? positionOptions;

    protected override void OnInitialized() =>
        positionOptions = Config.GetSection(PositionOptions.Position)
            .Get<PositionOptions>();
}
```

Output:

> :::no-loc text="Name: Joe Smith":::
> :::no-loc text="Title: Editor":::

After the app has started, changes to the JSON configuration in the app settings file are read. To demonstrate the behavior, change one or both configuration values in the app settings file and reload the page without restarting the app.

Summary of the differences between `Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*` and `Microsoft.Extensions.Configuration.ConfigurationBinder.Get*`:

* `Microsoft.Extensions.Configuration.ConfigurationBinder.Get*` is usually more convenient than using `Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*` because `Microsoft.Extensions.Configuration.ConfigurationBinder.Get*` creates and returns a new instance of the object, while `Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*` populates properties of an existing object instance that's typically established by another line of code.
* `Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*` allows the concretion of an abstract class, while `Microsoft.Extensions.Configuration.ConfigurationBinder.Get*` is only able to create a non-abstract instance of the options type.

## Bind options to the dependency injection service container

In the following example, `PositionOptions` is added to the service container with `Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*` and bound to configuration.

JSON configuration:

```json
"Position": {
  "Name": "Joe Smith",
  "Title": "Editor"
}
```

`PositionOptions.cs`:

```csharp
public class PositionOptions
{
    public const string Position = "Position";

    public string? Name { get; set; }
    public string? Title { get; set; }
}
```

Where services are registered for dependency injection in the app's `Program` file:

```csharp
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));
```

The following example reads the position options.

`DIOptions.razor`:

```razor
@page "/di-options"
@using Microsoft.Extensions.Options
@inject IOptions<PositionOptions> Options

Name: @Options.Value.Name<br>
Title: @Options.Value.Title
```

Output:

> :::no-loc text="Name: Joe Smith":::
> :::no-loc text="Title: Editor":::

For the preceding code, changes to the JSON configuration in the app settings file after the app has started are ***not*** read. To read changes after the app has started, use `IOptionsSnapshot`.

## Options interfaces

`Microsoft.Extensions.Options.IOptions`1`:

* Does ***not*** support:
  * Reading of configuration data after the app has started.
  * Named options.
* Is registered as a singleton service and can be injected into any service lifetime.

`Microsoft.Extensions.Options.IOptionsSnapshot`1`:

* Covered later in this article in the Use `IOptionsSnapshot` to read updated data section.
* Is useful in scenarios where options should be recomputed on every request.
* Is registered as a scoped service, so it can't be injected into a singleton service.
* Supports named options.

`Microsoft.Extensions.Options.IOptionsMonitor`1`:

* Covered later in this article in the Use `IOptionsMonitor` to read updated data section.
* Is used to retrieve options and manage options notifications for `TOptions` instances.
* Is registered as a singleton service and can be injected into any service lifetime.
* Supports:
  * Change notifications.
  * Named options.
  * Reloadable configuration.
  * Selective options invalidation (`Microsoft.Extensions.Options.IOptionsMonitorCache`1`).

Post-configuration scenarios enable setting or changing options after all `Microsoft.Extensions.Options.IConfigureOptions`1` configuration occurs.

`Microsoft.Extensions.Options.IOptionsFactory`1` is responsible for creating new options instances. It has a single `Microsoft.Extensions.Options.IOptionsFactory`1.Create*` method. The default implementation takes all registered `Microsoft.Extensions.Options.IConfigureOptions`1` and `Microsoft.Extensions.Options.IPostConfigureOptions`1` and runs all the configurations first, followed by the post-configuration. It distinguishes between `Microsoft.Extensions.Options.IConfigureNamedOptions`1` and `Microsoft.Extensions.Options.IConfigureOptions`1` and only calls the appropriate interface.

## Use `IOptionsSnapshot` to read updated data

Using `Microsoft.Extensions.Options.IOptionsSnapshot`1`:

* Options are computed once per request when accessed and cached for the lifetime of the request.
* May incur a significant performance penalty because it's a scoped service and is recomputed per request. For more information, see `IOptionsSnapshot` is very slow (`dotnet/runtime` #53793) and Improve the performance of configuration binding (`dotnet/runtime` #36130).
* Changes to the configuration are read after the app starts when using configuration providers that support reading updated configuration values.

The difference between `IOptionsMonitor` and `Microsoft.Extensions.Options.IOptionsSnapshot`1` is that:

* `Microsoft.Extensions.Options.IOptionsMonitor`1` is a singleton service that retrieves current option values at any time, which is especially useful in singleton dependencies.
* `Microsoft.Extensions.Options.IOptionsSnapshot`1` is a scoped service and provides a snapshot of the options at the time the `IOptionsSnapshot<T>` object is constructed. Options snapshots are designed for use with transient and scoped dependencies.

The ASP.NET Core runtime uses `Microsoft.Extensions.Options.OptionsCache`1` to cache the options instance after it's created.

JSON configuration:

```json
"Position": {
  "Name": "Joe Smith",
  "Title": "Editor"
}
```

`PositionOptions.cs`:

```csharp
public class PositionOptions
{
    public const string Position = "Position";

    public string? Name { get; set; }
    public string? Title { get; set; }
}
```

The following example uses `Microsoft.Extensions.Options.IOptionsSnapshot`1`.

`SnapshotOptions.razor`:

```razor
@page "/snapshot-options"
@using Microsoft.Extensions.Options
@inject IOptionsSnapshot<PositionOptions> Options

Name: @Options.Value.Name<br>
Title: @Options.Value.Title
```

Where services are registered for dependency injection, the following example registers a configuration instance which `PositionOptions` binds against:

```csharp
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));
```

Output:

> :::no-loc text="Name: Joe Smith":::
> :::no-loc text="Title: Editor":::

After the app has started, changes to the JSON configuration in the app settings file are read. To demonstrate the behavior, change one or both configuration values in the app settings file and reload the page without restarting the app.

## Use `IOptionsMonitor` to read updated data

`Microsoft.Extensions.Options.IOptionsMonitor`1` is used to retrieve options and manage options notifications for `TOptions` instances.

The difference between `Microsoft.Extensions.Options.IOptionsMonitor`1` and `IOptionsSnapshot` is that:

* `Microsoft.Extensions.Options.IOptionsMonitor`1` is a singleton service that retrieves current option values at any time, which is especially useful in singleton dependencies.
* `Microsoft.Extensions.Options.IOptionsSnapshot`1` is a scoped service and provides a snapshot of the options at the time the `IOptionsSnapshot<T>` object is constructed. Options snapshots are designed for use with transient and scoped dependencies.

`Microsoft.Extensions.Options.IOptionsMonitorCache`1` is used by `Microsoft.Extensions.Options.IOptionsMonitor`1` to cache `TOptions` instances. `Microsoft.Extensions.Options.IOptionsMonitorCache`1.TryRemove*` invalidates options instances in the monitor so that the value is recomputed. Values can be manually introduced with `Microsoft.Extensions.Options.IOptionsMonitorCache`1.TryAdd*`. The `Microsoft.Extensions.Options.IOptionsMonitorCache`1.Clear*` method is used when all named instances should be recreated on demand.

JSON configuration:

```json
"Position": {
  "Name": "Joe Smith",
  "Title": "Editor"
}
```

`PositionOptions.cs`:

```csharp
public class PositionOptions
{
    public const string Position = "Position";

    public string? Name { get; set; }
    public string? Title { get; set; }
}
```

Where services are registered for dependency injection, the following example registers a configuration instance which `PositionOptions` binds against:

```csharp
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));
```

The following example uses `Microsoft.Extensions.Options.IOptionsMonitor`1`.

`MonitorOptions.razor`:

```razor
@page "/monitor-options"
@using Microsoft.Extensions.Options
@inject IOptionsMonitor<PositionOptions> Options

Name: @Options.CurrentValue.Name<br>
Title: @Options.CurrentValue.Title
```

Output:

> :::no-loc text="Name: Joe Smith":::
> :::no-loc text="Title: Editor":::

After the app has started, changes to the JSON configuration in the app settings file are read. To demonstrate the behavior, change one or both configuration values in the app settings file and reload the page without restarting the app.
