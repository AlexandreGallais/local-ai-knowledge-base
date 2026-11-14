---
title: "MeterOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/MeterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MeterOptions class

Namespace: `System.Diagnostics.Metrics`

```csharp
public class MeterOptions
```

The options for creating a `Meter`.

To be added.

## MeterOptions.MeterOptions(String) constructor

```csharp
public MeterOptions (string name);
```

Constructs a new instance of `MeterOptions`.

Parameters:

- `name`: The Meter name.

To be added.

## MeterOptions.Name property

```csharp
public string Name { get; set; }
```

The Meter name.

Returns: To be added.

To be added.

## MeterOptions.Scope property

```csharp
public object? Scope { get; set; }
```

The optional opaque object to attach to the Meter. The scope object can be attached to multiple meters for scoping purposes.

Returns: To be added.

To be added.

## MeterOptions.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? Tags { get; set; }
```

The optional list of key-value pair tags associated with the Meter.

Returns: To be added.

To be added.

## MeterOptions.TelemetrySchemaUrl property

```csharp
public string? TelemetrySchemaUrl { get; set; }
```

Gets the location of a Schema File that can be retrieved using HTTP or HTTPS protocol.

Returns: To be added.

To be added.

## MeterOptions.Version property

```csharp
public string? Version { get; set; }
```

The optional Meter version.

Returns: To be added.

To be added.
