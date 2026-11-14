---
title: "DateTimeKind enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeKind.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeKind enum

Namespace: `System`

```csharp
public enum DateTimeKind
```

Specifies whether a `DateTime` object represents a local time, a Coordinated Universal Time (UTC), or is not specified as either local time or UTC.

#### Remarks
A member of the `DateTimeKind` enumeration is returned by the `Kind` property.

The members of the `DateTimeKind` enumeration are used in conversion operations between local time and Coordinated Universal Time (UTC), but not in comparison or arithmetic operations. For more information about time conversions, see Converting Times Between Time Zones.

## DateTimeKind.Local field

```csharp
Local
```

The time represented is local time.

## DateTimeKind.Unspecified field

```csharp
Unspecified
```

The time represented is not specified as either local time or Coordinated Universal Time (UTC).

## DateTimeKind.Utc field

```csharp
Utc
```

The time represented is UTC.
