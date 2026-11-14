---
title: "IMeterFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/IMeterFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IMeterFactory interface

Namespace: `System.Diagnostics.Metrics`

```csharp
public interface IMeterFactory : IDisposable
```

A factory for creating `Meter` instances.

Meter factories will be accountable for the following responsibilities:

Creating a new meter.
Attaching the factory instance as a scope to the Meter constructor for all created Meter objects.
Storing created meters in a cache and returning a cached instance if a meter with the same parameters (name, version, and tags) is requested.
Disposing of all cached Meter objects upon factory disposal.

## IMeterFactory.Create(MeterOptions) method

```csharp
public System.Diagnostics.Metrics.Meter Create (System.Diagnostics.Metrics.MeterOptions options);
```

Creates a new `Meter` instance.

Parameters:

- `options`: The `MeterOptions` to use when creating the meter.

Returns: A new `Meter` instance.

The `Meter` instance returned by this method should be cached by the factory and returned for subsequent requests for a meter with the same parameters (name, version, and tags).
