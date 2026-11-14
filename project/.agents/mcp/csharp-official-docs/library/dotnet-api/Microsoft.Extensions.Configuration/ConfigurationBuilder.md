---
title: "ConfigurationBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationBuilder class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public class ConfigurationBuilder : Microsoft.Extensions.Configuration.IConfigurationBuilder
```

Builds key/value-based configuration settings for use in an application.

#### Remarks

By using this class, you can store configuration values in a JSON file, for example, and then retrieve them at run time. For more information, see Configuration - basic example.

If you're migrating an app to .NET Core 3.1 or a later version, you can use this class to replace the *app.config* file functionality that you may have previously used to configure your app.

#### Example

The following code snippet shows a simplified app that creates a `ConfigurationBuilder` object to retrieve a string value from a JSON file at run time.

_Code sample not included: ~/snippets/csharp/Microsoft.Extensions.Configuration/ConfigurationBuilder/Overview/Program.cs._
The contents of the JSON file are shown here.

_Code sample not included: ~/snippets/csharp/Microsoft.Extensions.Configuration/ConfigurationBuilder/Overview/appsettings.json._
## ConfigurationBuilder.ConfigurationBuilder() constructor

```csharp
public ConfigurationBuilder ();
```

Initializes a new instance of the `ConfigurationBuilder` class.

To be added.

## ConfigurationBuilder.Properties property

```csharp
public System.Collections.Generic.IDictionary<string,object> Properties { get; }
```

Gets a key/value collection that can be used to share data between the `IConfigurationBuilder`
and the registered `IConfigurationProvider` providers.

Returns: A key/value collection that can be used to share data between the `IConfigurationBuilder`
and the registered configuration providers.

To be added.

## ConfigurationBuilder.Sources property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Configuration.IConfigurationSource> Sources { get; }
```

Gets the sources used to obtain configuration values.

Returns: The sources used to obtain configuration values.

To be added.

## ConfigurationBuilder.Add(IConfigurationSource) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationBuilder Add (Microsoft.Extensions.Configuration.IConfigurationSource source);
```

Adds a new configuration source.

Parameters:

- `source`: The configuration source to add.

Returns: The same `IConfigurationBuilder`.

To be added.

## ConfigurationBuilder.Build() method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationRoot Build ();
```

Builds an `IConfiguration` with keys and values from the set of providers registered in
`ConfigurationBuilder.Sources`.

Returns: An `IConfigurationRoot` with keys and values from the registered providers.

To be added.
