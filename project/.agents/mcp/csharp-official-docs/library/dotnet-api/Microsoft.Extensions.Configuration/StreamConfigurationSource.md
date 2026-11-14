---
title: "StreamConfigurationSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/StreamConfigurationSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamConfigurationSource class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public abstract class StreamConfigurationSource : Microsoft.Extensions.Configuration.IConfigurationSource
```

Defines the core behavior of stream-based configuration sources and provides a base for derived classes.

To be added.

## StreamConfigurationSource.StreamConfigurationSource() constructor

```csharp
protected StreamConfigurationSource ();
```

Initializes a new instance of `StreamConfigurationSource`.

To be added.

## StreamConfigurationSource.Stream property

```csharp
public System.IO.Stream? Stream { get; set; }
```

Gets or sets the stream containing the configuration data.

Returns: To be added.

To be added.

## StreamConfigurationSource.Build(IConfigurationBuilder) method

```csharp
public abstract Microsoft.Extensions.Configuration.IConfigurationProvider Build (Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Builds the `StreamConfigurationProvider` for this source.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: An `IConfigurationProvider` instance.

To be added.
