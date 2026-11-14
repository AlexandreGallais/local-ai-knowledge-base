---
title: "GCCollectionMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/GCCollectionMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCCollectionMode enum

Namespace: `System`

```csharp
public enum GCCollectionMode
```

Specifies the behavior for a forced garbage collection.

#### Remarks
Use the `GC.Collect` method overload to specify the `GCCollectionMode` value.

#### Examples
The following example forces a garbage collection for generation 2 objects with the Optimized setting.

_Code sample not included: ~/snippets/csharp/System/GC/Collect/Program.cs._

## GCCollectionMode.Aggressive field

```csharp
Aggressive
```

Requests that the garbage collector decommit as much memory as possible.

## GCCollectionMode.Default field

```csharp
Default
```

The default setting for this enumeration, which is currently `GCCollectionMode.Forced`.

## GCCollectionMode.Forced field

```csharp
Forced
```

Forces the garbage collection to occur immediately.

## GCCollectionMode.Optimized field

```csharp
Optimized
```

Allows the garbage collector to determine whether the current time is optimal to reclaim objects.
