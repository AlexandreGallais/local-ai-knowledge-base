---
title: "Implement a custom configuration provider"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/custom-configuration-provider.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Implement a custom configuration provider in .NET

There are many configuration providers available for common configuration sources such as JSON, XML, and INI files. You may need to implement a custom configuration provider when one of the available providers doesn't suit your application needs. In this article, you'll learn how to implement a custom configuration provider that relies on a database as its configuration source.

## Custom configuration provider

The sample app demonstrates how to create a basic <example-value> provider that reads configuration key-value pairs from a database using Entity Framework (EF) Core.

The provider has the following characteristics:

- The EF in-memory database is used for demonstration purposes.
  - To use a database that requires a connection string, get a connection string from an interim configuration.
- The provider reads a database table into configuration at startup. The provider doesn't query the database on a per-key basis.
- Reload-on-change isn't implemented, so updating the database after the app has started will not affect the app's configuration.

Define a `Settings` record type entity for storing configuration values in the database. For example, you could add a *Settings.cs* file in your *Models* folder:

```csharp
﻿namespace CustomProvider.Example.Models;

public record Settings(string Id, string? Value);
```
For information on record types, see Record types in C#.

Add an `EntityConfigurationContext` to store and access the configured values.

*Providers/EntityConfigurationContext.cs*:

```csharp
﻿using CustomProvider.Example.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomProvider.Example.Providers;

public sealed class EntityConfigurationContext(string? connectionString) : DbContext
{
    public DbSet<Settings> Settings => Set<Settings>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        _ = connectionString switch
        {
            { Length: > 0 } => optionsBuilder.UseSqlServer(connectionString),
            _ => optionsBuilder.UseInMemoryDatabase("InMemoryDatabase")
        };
    }
}
```
By overriding `Microsoft.EntityFrameworkCore.DbContext.OnConfiguring(Microsoft.EntityFrameworkCore.DbContextOptionsBuilder)` you can use the appropriate database connection. For example, if a connection string was provided you could connect to SQL Server, otherwise you could rely on an in-memory database.

Create a class that implements `Microsoft.Extensions.Configuration.IConfigurationSource`.

*Providers/EntityConfigurationSource.cs*:

```csharp
﻿using Microsoft.Extensions.Configuration;

namespace CustomProvider.Example.Providers;

public sealed class EntityConfigurationSource(
    string? connectionString) : IConfigurationSource
{
    public IConfigurationProvider Build(IConfigurationBuilder builder) =>
        new EntityConfigurationProvider(connectionString);
}
```
Create the custom configuration provider by inheriting from `Microsoft.Extensions.Configuration.ConfigurationProvider`. The configuration provider initializes the database when it's empty. Since configuration keys are case-insensitive, the dictionary used to initialize the database is created with the case-insensitive comparer (StringComparer.OrdinalIgnoreCase).

*Providers/EntityConfigurationProvider.cs*:

```csharp
﻿using CustomProvider.Example.Models;
using Microsoft.Extensions.Configuration;

namespace CustomProvider.Example.Providers;

public sealed class EntityConfigurationProvider(
    string? connectionString)
    : ConfigurationProvider
{
    public override void Load()
    {
        using var dbContext = new EntityConfigurationContext(connectionString);

        dbContext.Database.EnsureCreated();

        Data = dbContext.Settings.Any()
            ? dbContext.Settings.ToDictionary(
                static c => c.Id,
                static c => c.Value, StringComparer.OrdinalIgnoreCase)
            : CreateAndSaveDefaultValues(dbContext);
    }

    static Dictionary<string, string?> CreateAndSaveDefaultValues(
        EntityConfigurationContext context)
    {
        var settings = new Dictionary<string, string?>(
            StringComparer.OrdinalIgnoreCase)
        {
            ["WidgetOptions:EndpointId"] = "b3da3c4c-9c4e-4411-bc4d-609e2dcc5c67",
            ["WidgetOptions:DisplayLabel"] = "Widgets Incorporated, LLC.",
            ["WidgetOptions:WidgetRoute"] = "api/widgets"
        };

        context.Settings.AddRange(
            [.. settings.Select(static kvp => new Settings(kvp.Key, kvp.Value))]);

        context.SaveChanges();

        return settings;
    }
}
```
An `AddEntityConfiguration` extension method permits adding the configuration source to the underlying `ConfigurationManager` instance.

*Extensions/ConfigurationManagerExtensions.cs*:

```csharp
﻿using CustomProvider.Example.Providers;

namespace Microsoft.Extensions.Configuration;

public static class ConfigurationManagerExtensions
{
    public static ConfigurationManager AddEntityConfiguration(
        this ConfigurationManager manager)
    {
        var connectionString = manager.GetConnectionString("WidgetConnectionString");

        IConfigurationBuilder configBuilder = manager;
        configBuilder.Add(new EntityConfigurationSource(connectionString));

        return manager;
    }
}
```
Since the `Microsoft.Extensions.Configuration.ConfigurationManager` is both an implementation of `Microsoft.Extensions.Configuration.IConfigurationBuilder` and `Microsoft.Extensions.Configuration.IConfigurationRoot`, the extension method can access the connection strings configuration and add the `EntityConfigurationSource`.

The following code shows how to use the custom `EntityConfigurationProvider` in *Program.cs*:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using CustomProvider.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.AddEntityConfiguration();

builder.Services.Configure<WidgetOptions>(
    builder.Configuration.GetSection("WidgetOptions"));

using IHost host = builder.Build();

WidgetOptions options = host.Services.GetRequiredService<IOptions<WidgetOptions>>().Value;
Console.WriteLine($"DisplayLabel={options.DisplayLabel}");
Console.WriteLine($"EndpointId={options.EndpointId}");
Console.WriteLine($"WidgetRoute={options.WidgetRoute}");

await host.RunAsync();
// Sample output:
//    WidgetRoute=api/widgets
//    EndpointId=b3da3c4c-9c4e-4411-bc4d-609e2dcc5c67
//    DisplayLabel=Widgets Incorporated, LLC.
```
## Consume provider

To consume the custom configuration provider, you can use the options pattern. With the sample app in place, define an options object to represent the widget settings.

```csharp
﻿namespace CustomProvider.Example;

public class WidgetOptions
{
    public required Guid EndpointId { get; set; }

    public required string DisplayLabel { get; set; } = null!;

    public required string WidgetRoute { get; set; } = null!;
}
```
A call to `Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*` registers a configuration instance, which `TOptions` binds against.

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using CustomProvider.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.AddEntityConfiguration();

builder.Services.Configure<WidgetOptions>(
    builder.Configuration.GetSection("WidgetOptions"));

using IHost host = builder.Build();

WidgetOptions options = host.Services.GetRequiredService<IOptions<WidgetOptions>>().Value;
Console.WriteLine($"DisplayLabel={options.DisplayLabel}");
Console.WriteLine($"EndpointId={options.EndpointId}");
Console.WriteLine($"WidgetRoute={options.WidgetRoute}");

await host.RunAsync();
// Sample output:
//    WidgetRoute=api/widgets
//    EndpointId=b3da3c4c-9c4e-4411-bc4d-609e2dcc5c67
//    DisplayLabel=Widgets Incorporated, LLC.
```
The preceding code configures the `WidgetOptions` object from the `"WidgetOptions"` section of the configuration. This enables the options pattern, exposing a dependency injection-ready `IOptions<WidgetOptions>` representation of the EF settings. The options are ultimately provided from the custom configuration provider.

## See also

- Configuration in .NET
- Configuration providers in .NET
- Options pattern in .NET
- Dependency injection in .NET
