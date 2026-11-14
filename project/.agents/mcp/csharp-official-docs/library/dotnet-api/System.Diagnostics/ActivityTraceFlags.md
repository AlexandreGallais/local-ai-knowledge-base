---
title: "ActivityTraceFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityTraceFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityTraceFlags enum

Namespace: `System.Diagnostics`

```csharp
public enum ActivityTraceFlags
```

Specifies flags defined by the W3C standard that are associated with an activity.

#### Remarks

An `ActivityTraceFlags` value is returned by the `ActivityTraceFlags` property.

## ActivityTraceFlags.None field

```csharp
None
```

The activity has not been marked.

## ActivityTraceFlags.RandomTraceId field

```csharp
RandomTraceId
```

To be added.

## ActivityTraceFlags.Recorded field

```csharp
Recorded
```

The activity (or more likely its parents) has been marked as useful to record.
