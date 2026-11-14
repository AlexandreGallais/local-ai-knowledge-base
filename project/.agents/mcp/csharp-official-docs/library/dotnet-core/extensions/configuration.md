---
title: "Configuration (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/configuration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Configuration in .NET

Configuration in .NET is performed using one or more configuration providers. Configuration providers read configuration data from key-value pairs using various configuration sources:

- Settings files, such as *appsettings.json*
- Environment variables
- Azure Key Vault
- Azure App Configuration
- Command-line arguments
- Custom providers (installed or created)
- Directory files
- In-memory .NET objects
- Third-party providers

> **Note:**
> For information about configuring the .NET runtime itself, see .NET Runtime configuration settings.

## Concepts and abstractions

Given one or more configuration sources, the `Microsoft.Extensions.Configuration.IConfiguration` type provides a unified view of the configuration data. Configuration is read-only, and the configuration pattern isn't designed to be programmatically writable. The `IConfiguration` interface is a single representation of all the configuration sources, as shown in the following diagram:

## Configure console apps

.NET console apps created using the dotnet new command template or Visual Studio by default *don't* expose configuration capabilities. To add configuration in a new .NET console application, add a package reference to 📦 Microsoft.Extensions.Configuration. This package is the foundation for configuration in .NET apps. It provides the `Microsoft.Extensions.Configuration.ConfigurationBuilder` and related types.

```csharp
﻿using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .AddInMemoryCollection(new Dictionary<string, string?>()
    {
        ["SomeKey"] = "SomeValue"
    })
    .Build();

Console.WriteLine(configuration["SomeKey"]);

// Outputs:
//   SomeValue
```
The preceding code:

- Creates a new `Microsoft.Extensions.Configuration.ConfigurationBuilder` instance.
- Adds an in-memory collection of key-value pairs to the configuration builder.
- Calls the `Microsoft.Extensions.Configuration.ConfigurationBuilder.Build` method to create an `Microsoft.Extensions.Configuration.IConfiguration` instance.
- Writes the value of the `SomeKey` key to the console.

While this example uses an in-memory configuration, there are many configuration providers available, exposing functionality for file-based, environment variables, command-line arguments, and other configuration sources. For more information, see Configuration providers in .NET.

## Alternative hosting approach

Commonly, your apps will do more than just read configuration. They'll likely use dependency injection, logging, and other services. The .NET Generic Host approach is recommended for apps that use these services. Instead, consider adding a package reference to 📦 Microsoft.Extensions.Hosting. Modify the *Program.cs* file to match the following code:

```csharp
﻿using Microsoft.Extensions.Hosting;

using IHost host = Host.CreateApplicationBuilder(args).Build();

// Application code should start here.

await host.RunAsync();
```
The `Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder(System.String[])` method provides default configuration for the app in the following order, from highest to lowest priority:

1. Command-line arguments using the Command-line configuration provider.
1. Environment variables using the Environment Variables configuration provider.
1. App secrets when the app runs in the `Development` environment.
1. *appsettings.*`Environment`*.json* using the JSON configuration provider. For example, *appsettings*.***Production***.*json* and *appsettings*.***Development***.*json*.
1. *appsettings.json* using the JSON configuration provider.
1. ChainedConfigurationProvider : Adds an existing `IConfiguration` as a source.

Adding a configuration provider overrides previous configuration values. For example, the Command-line configuration provider overrides all values from other providers because it's added last. If `SomeKey` is set in both *appsettings.json* and the environment, the environment value is used because it was added after *appsettings.json*.

## Binding

One of the key <example-value> of using the .NET configuration abstractions is the ability to *bind* configuration values to instances of .NET objects. For example, the JSON configuration provider can be used to map *appsettings.json* files to .NET objects and is used with dependency injection. This enables the options pattern, which uses classes to provide strongly typed access to groups of related settings. The default binder is reflection-based, but there's a source generator alternative that's easy to enable.

.NET configuration provides various abstractions. Consider the following interfaces:

- `Microsoft.Extensions.Configuration.IConfiguration`: Represents a set of key/value application configuration properties.
- `Microsoft.Extensions.Configuration.IConfigurationRoot`: Represents the root of an `IConfiguration` hierarchy.
- `Microsoft.Extensions.Configuration.IConfigurationSection`: Represents a section of application configuration values.

These abstractions are agnostic to their underlying configuration provider (`Microsoft.Extensions.Configuration.IConfigurationProvider`). In other words, you can use an `IConfiguration` instance to access any configuration value from multiple providers.

The binder processes configuration values in several ways:

- It uses a single configuration value directly for a `string` or `object` target, or converts it to a common .NET type, such as a numeric type, an enumeration, or a nullable type. The binder converts a Base64-encoded string to a byte array.
- It binds hierarchical configuration to an object's properties or constructor parameters.
- It binds child configuration sections to arrays, collections, sets, and dictionaries.
- It uses the matching configuration section directly when the target type is `Microsoft.Extensions.Configuration.IConfigurationSection`.
- It converts a single configuration value to a custom type. The default binder uses a `System.ComponentModel.TypeConverter` when the custom type defines one. The source-generated binder doesn't support this conversion.

> **Note:**
> The binder has a few limitations:
>
> - Properties are ignored if they have private setters or their type can't be converted.
> - Properties without corresponding configuration keys are ignored.

### Binding hierarchies

Configuration values can contain hierarchical data. Hierarchical objects are represented with the use of the `:` delimiter in the configuration keys. To access a configuration value, use the `:` character to delimit a hierarchy. For example, consider the following configuration values:

```json
{
  "Parent": {
    "FavoriteNumber": 7,
    "Child": {
      "Name": "Example",
      "GrandChild": {
        "Age": 3
      }
    }
  }
}
```

The following table represents example keys and their corresponding values for the preceding example JSON:

| Key                             | Value       |
|---------------------------------|-------------|
| `"Parent:FavoriteNumber"`       | `7`         |
| `"Parent:Child:Name"`           | `"Example"` |
| `"Parent:Child:GrandChild:Age"` | `3`         |

### Advanced binding scenarios

The configuration binder has specific behaviors and limitations when working with certain types. This section includes the following subsections:

- Bind to dictionaries
- Dictionary keys with colons
- Bind to IReadOnly* types
- Exclude properties from binding
- Bind with parameterized constructors

#### Bind to dictionaries

When you bind configuration to a `System.Collections.Generic.Dictionary`2` where the value is a mutable collection type (like arrays or lists), repeated binds to the same key <example-value> the collection values instead of replacing them.

The following example demonstrates this behavior:

```csharp
IConfiguration config = new ConfigurationBuilder()
    .AddInMemoryCollection()
    .Build();

config["Queue:0"] = "Value1";
var dict = new Dictionary<string, string[]>() { { "Queue", new[] { "InitialValue" } } };

Console.WriteLine("=== Dictionary Binding with Collection Values ===");
Console.WriteLine($"Initially: {string.Join(", ", dict["Queue"])}");

// In .NET 7+, binding extends the collection instead of replacing it.
config.Bind(dict);
Console.WriteLine($"After Bind: {string.Join(", ", dict["Queue"])}");

config["Queue:1"] = "Value2";
config.Bind(dict);
Console.WriteLine($"After 2nd Bind: {string.Join(", ", dict["Queue"])}");
```
For more information, see Binding config to dictionary extends values.

#### Dictionary keys with colons

The colon (`:`) character is reserved as a hierarchy delimiter in configuration keys. This means you can't use colons in dictionary keys when binding configuration. If your keys contain colons (such as URLs or other formatted identifiers), the configuration system interprets them as hierarchy paths rather than literal characters. Consider the following workarounds:

- Use alternative delimiter characters (such as double underscores `__`) in your configuration keys and transform them programmatically if needed.
- Manually deserialize the configuration as raw JSON using `System.Text.Json` or a similar library, which supports colons in keys.
- Create a custom mapping layer that translates safe keys to your desired keys with colons.

#### Bind to IReadOnly\* types

The configuration binder doesn't support binding directly to `IReadOnlyList<T>`, `IReadOnlyDictionary<TKey, TValue>`, or other read-only collection interfaces. These interfaces lack the mechanisms the binder needs to populate the collections.

To work with read-only collections, use mutable types for the properties that the binder populates, then expose them as read-only interfaces for consumers:

```csharp
Console.WriteLine("=== IReadOnly* Types (NOT Directly Supported) ===");

var readonlyConfig = new ConfigurationBuilder()
    .AddInMemoryCollection(new Dictionary<string, string?>
    {
        ["Settings:Values:0"] = "Item1",
        ["Settings:Values:1"] = "Item2",
        ["Settings:Values:2"] = "Item3",
    })
    .Build();

// This class uses List<string> for binding, exposes as IReadOnlyList<string>.
var settings = new SettingsWithReadOnly();
readonlyConfig.GetSection("Settings").Bind(settings);

Console.WriteLine("Values bound to mutable List, exposed as IReadOnlyList:");
foreach (var value in settings.ValuesReadOnly)
{
    Console.WriteLine($"  {value}");
}
```
The configuration class implementation:

```csharp
class SettingsWithReadOnly
{
    // Use mutable type for binding
    public List<string> Values { get; set; } = [];

    // Expose as read-only for consumers
    public IReadOnlyList<string> ValuesReadOnly => Values;
}
```
This approach allows the binder to populate the mutable `List<string>` while presenting an immutable interface to consumers through `IReadOnlyList<string>`.

#### Exclude properties from binding

If you don't want the configuration binder to populate a property, apply `Microsoft.Extensions.Configuration.ConfigurationIgnoreAttribute` to it (available starting in .NET 11).

```csharp
using Microsoft.Extensions.Configuration;

public sealed class AppOptions
{
    public string Endpoint { get; set; } = "";

    [ConfigurationIgnore]
    public string RuntimeValue { get; set; } = "calculated";
}
```
If configuration contains values for both `Endpoint` and `RuntimeValue`, the binder updates `Endpoint` and leaves `RuntimeValue` at its existing value.

#### Bind with parameterized constructors

Starting with .NET 7, the configuration binder supports binding to types with a single public parameterized constructor. This enables immutable types and records to be populated directly from configuration:

```csharp
Console.WriteLine("=== Parameterized Constructor Binding ===");

var ctorConfig = new ConfigurationBuilder()
    .AddInMemoryCollection(new Dictionary<string, string?>
    {
        ["AppSettings:Name"] = "MyApp",
        ["AppSettings:MaxConnections"] = "100",
        ["AppSettings:Timeout"] = "30"
    })
    .Build();

// Binding to a type with a single parameterized constructor
var appSettings = ctorConfig.GetSection("AppSettings").Get<AppSettings>();
if (appSettings != null)
{
    Console.WriteLine($"Name: {appSettings.Name}");
    Console.WriteLine($"MaxConnections: {appSettings.MaxConnections}");
    Console.WriteLine($"Timeout: {appSettings.Timeout}");
}
```
The immutable settings class:

```csharp
// Immutable type with single parameterized constructor.
class AppSettings
{
    public string Name { get; }
    public int MaxConnections { get; }
    public int Timeout { get; }

    public AppSettings(string name, int maxConnections, int timeout)
    {
        Name = name;
        MaxConnections = maxConnections;
        Timeout = timeout;
    }
}
```
> **Important:**
> The binder only supports types with a single public parameterized constructor. If a type has multiple public parameterized constructors, the binder cannot determine which one to use and binding will fail. Use either a single parameterized constructor or a parameterless constructor with property setters.
