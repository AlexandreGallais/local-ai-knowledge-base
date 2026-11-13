---
title: "Options pattern guidance for .NET library authors (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/options-library-authors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options pattern guidance for .NET library authors

With the help of dependency injection, registering your services and their corresponding configurations can make use of the *options pattern*. The options pattern enables consumers of your library (and your services) to require instances of options interfaces where `TOptions` is your options class. Consuming configuration options through strongly-typed objects helps to ensure consistent value representation, enables validation with data annotations, and removes the burden of manually parsing string values. There are many configuration providers for consumers of your library to use. With these providers, consumers can configure your library in many ways.

As a .NET library author, you'll learn general guidance on how to correctly expose the options pattern to consumers of your library. There are various ways to achieve the same thing, and several considerations to make.

## Naming conventions

By convention, extension methods responsible for registering services are named `Add{Service}`, where `{Service}` is a meaningful and descriptive name. `Add{Service}` extension methods are commonplace in ASP.NET Core and .NET alike.

✔️ CONSIDER names that disambiguate your service from other offerings.

❌ DO NOT use names that are already part of the .NET ecosystem from official Microsoft packages.

✔️ CONSIDER naming static classes that expose extension methods as `{Type}Extensions`, where `{Type}` is the type that you're extending.

### Namespace guidance

Microsoft packages make use of the `Microsoft.Extensions.DependencyInjection` namespace to unify the registration of various service offerings.

✔️ CONSIDER a namespace that clearly identifies your package offering.

❌ DO NOT use the `Microsoft.Extensions.DependencyInjection` namespace for non-official Microsoft packages.

## Parameterless

If your service can work with minimal or no explicit configuration, consider a parameterless extension method.

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ExampleLibrary.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyLibraryService(
        this IServiceCollection services)
    {
        services.AddOptions<LibraryOptions>()
            .Configure(options =>
            {
                // Specify default option values
            });

        // Register lib services here...
        // services.AddScoped<ILibraryService, DefaultLibraryService>();

        return services;
    }
}
```
In the preceding code, the `AddMyLibraryService`:

- Extends an instance of `Microsoft.Extensions.DependencyInjection.IServiceCollection`
- Calls `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.AddOptions``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)` with the type parameter of `LibraryOptions`
- Chains a call to `Microsoft.Extensions.Options.OptionsBuilder`1.Configure*`, which specifies the default option values

## `IConfiguration` parameter

When you author a library that exposes many options to consumers, you may want to consider requiring an `IConfiguration` parameter extension method. The expected `IConfiguration` instance should be scoped to a named section of the configuration by using the `Microsoft.Extensions.Configuration.IConfiguration.GetSection*` function.

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ExampleLibrary.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyLibraryService(
      this IServiceCollection services,
      IConfiguration namedConfigurationSection)
    {
        // Default library options are overridden
        // by bound configuration values.
        services.Configure<LibraryOptions>(namedConfigurationSection);

        // Register lib services here...
        // services.AddScoped<ILibraryService, DefaultLibraryService>();

        return services;
    }
}
```
> **Tip:**
> The `Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure``1(Microsoft.Extensions.DependencyInjection.IServiceCollection,Microsoft.Extensions.Configuration.IConfiguration)` method is part of the `Microsoft.Extensions.Options.ConfigurationExtensions` NuGet package.

In the preceding code, the `AddMyLibraryService`:

- Extends an instance of `Microsoft.Extensions.DependencyInjection.IServiceCollection`
- Defines an `Microsoft.Extensions.Configuration.IConfiguration` parameter `namedConfigurationSection`
- Calls `Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure``1(Microsoft.Extensions.DependencyInjection.IServiceCollection,Microsoft.Extensions.Configuration.IConfiguration)` passing the generic type parameter of `LibraryOptions` and the `namedConfigurationSection` instance to configure

Consumers in this pattern provide the scoped `IConfiguration` instance of the named section:

```csharp
﻿using ExampleLibrary.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMyLibraryService(
    builder.Configuration.GetSection("LibraryOptions"));

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
The call to `.AddMyLibraryService` is made on the `Microsoft.Extensions.DependencyInjection.IServiceCollection` type.

As the library author, specifying default values is up to you.

> **Note:**
> It is possible to bind configuration to an options instance. However, there is a risk of name collisions - which will cause errors. Additionally, when manually binding in this way, you limit the consumption of your options pattern to read-once. Changes to settings will not be re-bound, as such consumers will not be able to use the IOptionsMonitor interface.
>
> ```csharp
> services.AddOptions<LibraryOptions>()
>     .Configure<IConfiguration>(
>         (options, configuration) =>
>             configuration.GetSection("LibraryOptions").Bind(options));
> ```
>
> Instead, you should use the `Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.BindConfiguration*` extension method. This extension method binds the configuration to the options instance, and also registers a change token source for the configuration section. This allows consumers to use the IOptionsMonitor interface.

## Configuration section path parameter

Consumers of your library may want to specify the configuration section path to bind your underlying `TOptions` type. In this scenario, you define a `string` parameter in your extension method.

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ExampleLibrary.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyLibraryService(
      this IServiceCollection services,
      string configSectionPath)
    {
        services.AddOptions<SupportOptions>()
            .BindConfiguration(configSectionPath)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        // Register lib services here...
        // services.AddScoped<ILibraryService, DefaultLibraryService>();

        return services;
    }
}
```
In the preceding code, the `AddMyLibraryService`:

- Extends an instance of `Microsoft.Extensions.DependencyInjection.IServiceCollection`
- Defines a `string` parameter `configSectionPath`
- Calls:
  - `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.AddOptions*` with the generic type parameter of `SupportOptions`
  - `Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.BindConfiguration*` with the given `configSectionPath` parameter
  - `Microsoft.Extensions.DependencyInjection.OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations*` to enable data annotation validation
  - `Microsoft.Extensions.DependencyInjection.OptionsBuilderExtensions.ValidateOnStart*` to enforce validation on start rather than in runtime

In the next example, the Microsoft.Extensions.Options.DataAnnotations NuGet package is used to enable data annotation validation. The `SupportOptions` class is defined as follows:

```csharp
﻿using System.ComponentModel.DataAnnotations;

public sealed class SupportOptions
{
    [Url]
    public string? Url { get; set; }

    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, DataType(DataType.PhoneNumber)]
    public required string PhoneNumber { get; set; }
}
```
Imagine that the following JSON _appsettings.json_ file is used:

```json
{
    "Support": {
        "Url": "https://support.example.com",
        "Email": "help@support.example.com",
        "PhoneNumber": "+1(888)-SUPPORT"
    }
}
```
## `Action<TOptions>` parameter

Consumers of your library may be interested in providing a lambda expression that yields an instance of your options class. In this scenario, you define an `Action<LibraryOptions>` parameter in your extension method.

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ExampleLibrary.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyLibraryService(
        this IServiceCollection services,
        Action<LibraryOptions> configureOptions)
    {
        services.Configure(configureOptions);

        // Register lib services here...
        // services.AddScoped<ILibraryService, DefaultLibraryService>();

        return services;
    }
}
```
In the preceding code, the `AddMyLibraryService`:

- Extends an instance of `Microsoft.Extensions.DependencyInjection.IServiceCollection`
- Defines an `System.Action`1` parameter `configureOptions` where `T` is `LibraryOptions`
- Calls `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.Configure*` given the `configureOptions` action

Consumers in this pattern provide a lambda expression (or a delegate that satisfies the `Action<LibraryOptions>` parameter):

```csharp
﻿using ExampleLibrary.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMyLibraryService(options =>
{
    // User defined option values
    // options.SomePropertyValue = ...
});
                                                                        
using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
## Options instance parameter

Consumers of your library might prefer to provide an inlined options instance. In this scenario, you expose an extension method that takes an instance of your options object, `LibraryOptions`.

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ExampleLibrary.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyLibraryService(
      this IServiceCollection services,
      LibraryOptions userOptions)
    {
        services.AddOptions<LibraryOptions>()
            .Configure(options =>
            {
                // Overwrite default option values
                // with the user provided options.
                // options.SomeValue = userOptions.SomeValue;
            });

        // Register lib services here...
        // services.AddScoped<ILibraryService, DefaultLibraryService>();

        return services;
    }
}
```
In the preceding code, the `AddMyLibraryService`:

- Extends an instance of `Microsoft.Extensions.DependencyInjection.IServiceCollection`
- Calls `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.AddOptions``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)` with the type parameter of `LibraryOptions`
- Chains a call to `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.Configure*`, which specifies default option values that can be overridden from the given `userOptions` instance

Consumers in this pattern provide an instance of the `LibraryOptions` class, defining desired property values inline:

```csharp
﻿using ExampleLibrary.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMyLibraryService(new LibraryOptions
{
    // Specify option values
    // SomePropertyValue = ...
});

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
## Post configuration

After all configuration option values are bound or specified, post configuration functionality is available. Exposing the same `Action<TOptions>` parameter detailed earlier, you could choose to call `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.PostConfigure*`. Post configure runs after all `.Configure` calls. There are few reasons why you'd want to consider using `PostConfigure`:

- **Execution order**: You can override any configuration values that were set in the `.Configure` calls.
- **Validation**: You can validate the default values have been set after all other configurations have been applied.

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ExampleLibrary.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyLibraryService(
      this IServiceCollection services,
      Action<LibraryOptions> configureOptions)
    {
        services.PostConfigure(configureOptions);

        // Register lib services here...
        // services.AddScoped<ILibraryService, DefaultLibraryService>();

        return services;
    }
}
```
In the preceding code, the `AddMyLibraryService`:

- Extends an instance of `Microsoft.Extensions.DependencyInjection.IServiceCollection`
- Defines an `System.Action`1` parameter `configureOptions` where `T` is `LibraryOptions`
- Calls `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.PostConfigure*` given the `configureOptions` action

Consumers in this pattern provide a lambda expression (or a delegate that satisfies the `Action<LibraryOptions>` parameter), just as they would with the `Action<TOptions>` parameter in a non-post configuration scenario:

```csharp
﻿using ExampleLibrary.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMyLibraryService(options =>
{
    // Specify option values
    // options.SomePropertyValue = ...
});

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
