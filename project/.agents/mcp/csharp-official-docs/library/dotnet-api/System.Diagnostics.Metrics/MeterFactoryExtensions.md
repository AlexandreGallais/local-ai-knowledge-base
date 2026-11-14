---
title: "MeterFactoryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/MeterFactoryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MeterFactoryExtensions class

Namespace: `System.Diagnostics.Metrics`

```csharp
public static class MeterFactoryExtensions
```

Extension methods for `Meter` and `IMeterFactory`.

To be added.

## MeterFactoryExtensions.Create(IMeterFactory, String, String, Object>>) method

```csharp
public static System.Diagnostics.Metrics.Meter Create (this System.Diagnostics.Metrics.IMeterFactory meterFactory, string name, string? version = default, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default);
```

Creates a `Meter` with the specified `name`, `version`, and `tags`.

Parameters:

- `meterFactory`: The `IMeterFactory` to use to create the `Meter`.
- `name`: The name of the `Meter`.
- `version`: The version of the `Meter`.
- `tags`: The tags to associate with the `Meter`.

Returns: A `Meter` with the specified `name`, `version`, and `tags`.

To be added.
