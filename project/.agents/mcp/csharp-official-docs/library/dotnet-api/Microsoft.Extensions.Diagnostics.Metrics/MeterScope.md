---
title: "MeterScope enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.Metrics/MeterScope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MeterScope enum

Namespace: `Microsoft.Extensions.Diagnostics.Metrics`

```csharp
public enum MeterScope
```

Represents scopes used by `InstrumentRule` to distinguish between meters created via `Meter` constructors (`MeterScope.Global`)
and those created via Dependency Injection with `IMeterFactory.Create` (`MeterScope.Local`).

To be added.

## MeterScope.Global field

```csharp
Global
```

Indicates `Meter` instances created via `Meter` constructors.

## MeterScope.Local field

```csharp
Local
```

Indicates `Meter` instances created via Dependency Injection with `IMeterFactory.Create`.

## MeterScope.None field

```csharp
None
```

No scope is specified. This field should not be used.
