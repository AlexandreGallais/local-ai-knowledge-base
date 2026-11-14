---
title: "IConfigurationBuilder interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/IConfigurationBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfigurationBuilder interface

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public interface IConfigurationBuilder
```

Represents a type used to build application configuration.

To be added.

## IConfigurationBuilder.Properties property

```csharp
public System.Collections.Generic.IDictionary<string,object> Properties { get; }
```

Gets a key/value collection that can be used to share data between the `IConfigurationBuilder`
and the registered `IConfigurationSource`s.

Returns: To be added.

To be added.

## IConfigurationBuilder.Sources property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Configuration.IConfigurationSource> Sources { get; }
```

Gets the sources used to obtain configuration values

Returns: To be added.

To be added.

## IConfigurationBuilder.Add(IConfigurationSource) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationBuilder Add (Microsoft.Extensions.Configuration.IConfigurationSource source);
```

Adds a new configuration source.

Parameters:

- `source`: The configuration source to add.

Returns: The same `IConfigurationBuilder`.

To be added.

## IConfigurationBuilder.Build() method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationRoot Build ();
```

Builds an `IConfiguration` with keys and values from the set of sources registered in
`IConfigurationBuilder.Sources`.

Returns: An `IConfigurationRoot` with keys and values from the registered sources.

To be added.
