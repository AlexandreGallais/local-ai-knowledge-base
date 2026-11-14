---
title: "StreamConfigurationProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/StreamConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamConfigurationProvider class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public abstract class StreamConfigurationProvider : Microsoft.Extensions.Configuration.ConfigurationProvider
```

Defines the core behavior of stream-based configuration providers and provides a base for derived classes.

To be added.

## StreamConfigurationProvider.StreamConfigurationProvider(StreamConfigurationSource) constructor

```csharp
public StreamConfigurationProvider (Microsoft.Extensions.Configuration.StreamConfigurationSource source);
```

Initializes a new instance of the `StreamConfigurationProvider` class.

Parameters:

- `source`: The source.

To be added.

## StreamConfigurationProvider.Source property

```csharp
public Microsoft.Extensions.Configuration.StreamConfigurationSource Source { get; }
```

Gets the source settings for this provider.

Returns: To be added.

To be added.

## StreamConfigurationProvider.Load() method

```csharp
public override void Load ();
```

Loads the configuration data from the stream.

This method throws an exception on subsequent calls.

## StreamConfigurationProvider.Load(Stream) method

```csharp
public abstract void Load (System.IO.Stream stream);
```

Loads the configuration data from the stream.

Parameters:

- `stream`: The data stream.

To be added.
