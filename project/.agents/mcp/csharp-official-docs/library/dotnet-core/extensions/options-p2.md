---
title: "Options pattern (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/options.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Options pattern (part 2 of 3)

## Named options support using IConfigureNamedOptions

Named options:

- Are useful when multiple configuration sections bind to the same properties.
- Are case-sensitive.

Consider the following *appsettings.json* file:

```json
{
  "Features": {
    "Personalize": {
      "Enabled": true,
      "ApiKey": "<example-value>"
    },
    "WeatherStation": {
      "Enabled": true,
      "ApiKey": "<example-value>"
    }
  }
}
```

Rather than creating two classes to bind `Features:Personalize` and `Features:WeatherStation`,
the following class is used for each section:

```csharp
public class Features
{
    public const string Personalize = nameof(Personalize);
    public const string WeatherStation = nameof(WeatherStation);

    public bool Enabled { get; set; }
    public string ApiKey { get; set; }
}
```

The following code configures the named options:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

// Omitted for brevity...

builder.Services.Configure<Features>(
    Features.Personalize,
    builder.Configuration.GetSection("Features:Personalize"));

builder.Services.Configure<Features>(
    Features.WeatherStation,
    builder.Configuration.GetSection("Features:WeatherStation"));
```

The following code displays the named options:

```csharp
public sealed class Service
{
    private readonly Features _personalizeFeature;
    private readonly Features _weatherStationFeature;

    public Service(IOptionsSnapshot<Features> namedOptionsAccessor)
    {
        _personalizeFeature = namedOptionsAccessor.Get(Features.Personalize);
        _weatherStationFeature = namedOptionsAccessor.Get(Features.WeatherStation);
    }
}
```

All options are named instances. `Microsoft.Extensions.Options.IConfigureOptions`1` instances are treated as targeting the `Options.DefaultName` instance, which is `string.Empty`. `Microsoft.Extensions.Options.IConfigureNamedOptions`1` also implements `Microsoft.Extensions.Options.IConfigureOptions`1`. The default implementation of the `Microsoft.Extensions.Options.IOptionsFactory`1` has logic to use each appropriately. The `null` named option is used to target all of the named instances instead of a specific named instance. `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.ConfigureAll*` and `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.PostConfigureAll*` use this convention.

## OptionsBuilder API

`Microsoft.Extensions.Options.OptionsBuilder`1` is used to configure `TOptions` instances. `OptionsBuilder` streamlines creating named options as it's only a single parameter to the initial `AddOptions<TOptions>(string optionsName)` call instead of appearing in all of the subsequent calls. Options validation and the `ConfigureOptions` overloads that accept service dependencies are only available via `OptionsBuilder`.

`OptionsBuilder` is used in the Options validation section.

## Use DI services to configure options

When you're configuring options, you can use dependency injection to access registered services, and use them to configure options. This is useful when you need to access services to configure options. Services can be accessed from DI while configuring options in two ways:

- Pass a configuration delegate to Configure on OptionsBuilder\<TOptions>. `OptionsBuilder<TOptions>` provides overloads of Configure that allow use of up to five services to configure options:

  ```csharp
  builder.Services
      .AddOptions<MyOptions>("optionalName")
      .Configure<ExampleService, ScopedService, MonitorService>(
          (options, es, ss, ms) =>
              options.Property = DoSomethingWith(es, ss, ms));
  ```

- Create a type that implements `Microsoft.Extensions.Options.IConfigureOptions`1` or `Microsoft.Extensions.Options.IConfigureNamedOptions`1` and register the type as a service.

It's recommended to pass a configuration delegate to Configure, since creating a service is more complex. Creating a type is equivalent to what the framework does when calling Configure. Calling Configure registers a transient generic `Microsoft.Extensions.Options.IConfigureNamedOptions`1`, which has a constructor that accepts the generic service types specified.

## Options validation

Options validation enables option values to be validated.

Consider the following *appsettings.json* file:

```json
{
  "MyCustomSettingsSection": {
    "SiteTitle": "Amazing docs from Awesome people!",
    "Scale": 10,
    "VerbosityLevel": 32
  }
}
```

The following class binds to the `"MyCustomSettingsSection"` configuration section and applies a couple of `DataAnnotations` rules:

```csharp
﻿using System.ComponentModel.DataAnnotations;

namespace ConsoleJson.Example;

public sealed class SettingsOptions
{
    public const string ConfigurationSectionName = "MyCustomSettingsSection";

    [Required]
    [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$")]
    public required string SiteTitle { get; set; }

    [Required]
    [Range(0, 1_000,
        ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    public required int Scale { get; set; }

    [Required]
    public required int VerbosityLevel { get; set; }
}
```
In the preceding `SettingsOptions` class, the `ConfigurationSectionName` property contains the name of the configuration section to bind to. In this scenario, the options object provides the name of its configuration section.

> **Tip:**
> The configuration section name is independent of the configuration object that it's binding to. In other words, a configuration section named `"FooBarOptions"` can be bound to an options object named `ZedOptions`. Although it might be common to name them the same, it's *not* necessary and can actually cause name conflicts.

The following code:

- Calls `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.AddOptions*` to get an OptionsBuilder\<TOptions> that binds to the `SettingsOptions` class.
- Calls `Microsoft.Extensions.DependencyInjection.OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations*` to enable validation using `DataAnnotations`.

```csharp
builder.Services
    .AddOptions<SettingsOptions>()
    .Bind(builder.Configuration.GetSection(SettingsOptions.ConfigurationSectionName))
    .ValidateDataAnnotations();
```

The `ValidateDataAnnotations` extension method is defined in the Microsoft.Extensions.Options.DataAnnotations NuGet package.

The following code displays the configuration values or reports validation errors:

```csharp
﻿using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ConsoleJson.Example;

public sealed class ValidationService
{
    private readonly ILogger<ValidationService> _logger;
    private readonly IOptions<SettingsOptions> _config;

    public ValidationService(
        ILogger<ValidationService> logger,
        IOptions<SettingsOptions> config)
    {
        _config = config;
        _logger = logger;

        try
        {
            SettingsOptions options = _config.Value;
        }
        catch (OptionsValidationException ex)
        {
            foreach (string failure in ex.Failures)
            {
                _logger.LogError("Validation error: {FailureMessage}", failure);
            }
        }
    }
}
```
The following code applies a more complex validation rule using a delegate:

```csharp
builder.Services
    .AddOptions<SettingsOptions>()
    .Bind(builder.Configuration.GetSection(SettingsOptions.ConfigurationSectionName))
    .ValidateDataAnnotations()
    .Validate(config =>
    {
        if (config.Scale != 0)
        {
            return config.VerbosityLevel > config.Scale;
        }

        return true;
    }, "VerbosityLevel must be > than Scale.");
```

The validation occurs at runtime, but you can configure it to occur at startup by instead chaining a call to `ValidateOnStart`:

```csharp
builder.Services
    .AddOptions<SettingsOptions>()
    .Bind(builder.Configuration.GetSection(SettingsOptions.ConfigurationSectionName))
    .ValidateDataAnnotations()
    .Validate(config =>
    {
        if (config.Scale != 0)
        {
            return config.VerbosityLevel > config.Scale;
        }

        return true;
    }, "VerbosityLevel must be > than Scale.")
    .ValidateOnStart();
```

To enable validation on start for a specific options type, use the `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.AddOptionsWithValidateOnStart``1(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.String)` API:

```csharp
builder.Services
    .AddOptionsWithValidateOnStart<SettingsOptions>()
    .Bind(builder.Configuration.GetSection(SettingsOptions.ConfigurationSectionName))
    .ValidateDataAnnotations()
    .Validate(config =>
    {
        if (config.Scale != 0)
        {
            return config.VerbosityLevel > config.Scale;
        }

        return true;
    }, "VerbosityLevel must be > than Scale.");
```

### `IValidateOptions` for complex validation

The following class implements `Microsoft.Extensions.Options.IValidateOptions`1`:

```csharp
﻿using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace ConsoleJson.Example;

sealed partial class ValidateSettingsOptions(
    IConfiguration config)
    : IValidateOptions<SettingsOptions>
{
    public SettingsOptions? Settings { get; private set; } =
        config.GetSection(SettingsOptions.ConfigurationSectionName)
              .Get<SettingsOptions>();

    public ValidateOptionsResult Validate(string? name, SettingsOptions options)
    {
        StringBuilder? failure = null;
    
        if (!ValidationRegex().IsMatch(options.SiteTitle))
        {
            (failure ??= new()).AppendLine($"{options.SiteTitle} doesn't match RegEx");
        }

        if (options.Scale is < 0 or > 1_000)
        {
            (failure ??= new()).AppendLine($"{options.Scale} isn't within Range 0 - 1000");
        }

        if (Settings is { Scale: 0 } && Settings.VerbosityLevel <= Settings.Scale)
        {
            (failure ??= new()).AppendLine("VerbosityLevel must be > than Scale.");
        }

        return failure is not null
            ? ValidateOptionsResult.Fail(failure.ToString())
            : ValidateOptionsResult.Success;
    }

    [GeneratedRegex("^[a-zA-Z''-'\\s]{1,40}$")]
    private static partial Regex ValidationRegex();
}
```
`IValidateOptions` enables moving the validation code into a class.

> **Note:**
> This example code relies on the Microsoft.Extensions.Configuration.Json NuGet package.

Using the preceding code, validation is enabled when configuring services with the following code:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

// Omitted for brevity...

builder.Services.Configure<SettingsOptions>(
    builder.Configuration.GetSection(
        SettingsOptions.ConfigurationSectionName));

builder.Services.TryAddEnumerable(
    ServiceDescriptor.Singleton
        <IValidateOptions<SettingsOptions>, ValidateSettingsOptions>());
```

### Recursive validation with `ValidateObjectMembers` and `ValidateEnumeratedItems`

By default, `DataAnnotations` validation only validates the properties of the options class itself. It doesn't recursively validate nested objects or items in collections. To enable recursive validation, use the `Microsoft.Extensions.Options.ValidateObjectMembersAttribute` and `Microsoft.Extensions.Options.ValidateEnumeratedItemsAttribute` attributes.

- The `Microsoft.Extensions.Options.ValidateObjectMembersAttribute` attribute enables recursive validation of nested objects.
- The `Microsoft.Extensions.Options.ValidateEnumeratedItemsAttribute` attribute enables recursive validation of enumerable objects.

Consider the following nested options classes:

```csharp
public sealed class DatabaseOptions
{
    [Required]
    [MinLength(1)]
    public string ConnectionString { get; set; } = string.Empty;

    [Range(1, 100)]
    public int MaxRetries { get; set; } = 3;

    [Range(1, 300)]
    public int TimeoutSeconds { get; set; } = 30;
}
```
```csharp
public sealed class ServerOptions
{
    [Required]
    [RegularExpression(@"^[a-zA-Z0-9\-\.]+$")]
    public string HostName { get; set; } = string.Empty;

    [Required]
    [Range(1, 65535)]
    public int Port { get; set; }
}
```
```csharp
public sealed class ApplicationOptionsWithAttribute
{
    public const string ConfigurationSectionName = "ApplicationWithAttribute";

    [Required]
    public required string ApplicationName { get; set; }

    // Validation recurses into DatabaseOptions.
    [ValidateObjectMembers]
    public DatabaseOptions Database { get; set; } = new();

    // Validation recurses into each ServerOptions in the list.
    [ValidateEnumeratedItems]
    public List<ServerOptions> Servers { get; set; } = [];
}
```
In the preceding code, the `Database` property is a nested object of type `DatabaseOptions`.

- Without the `[ValidateObjectMembers]` attribute applied to the `DatabaseOptions` property, the validation attributes on _its_ properties (like `[Required]` on `ConnectionString`) would not be evaluated. With `[ValidateObjectMembers]` applied, the validation also recurses into the `Database` property and validates its members according to their `DataAnnotations` attributes.
- Without the `[ValidateEnumeratedItems]` attribute applied to the `Servers` collection property, the validation attributes on individual `ServerOptions` items would not be evaluated. With the `[ValidateEnumeratedItems]` attribute applied, each `ServerOptions` item in the list is validated according to its `DataAnnotations` attributes.

> **Tip:**
> Both `ValidateObjectMembersAttribute` and `ValidateEnumeratedItemsAttribute` work with the compile-time options validation source generator for improved performance. For more information, see Compile-time options validation source generation.
