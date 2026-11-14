---
title: "CreateObjectFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CreateObjectFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CreateObjectFlags enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum CreateObjectFlags
```

Specifies flags for the `ComWrappers.GetOrCreateObjectForComInstance` method.

To be added.

## CreateObjectFlags.Aggregation field

```csharp
Aggregation
```

Defined when COM aggregation is involved (that is an inner instance supplied).

## CreateObjectFlags.None field

```csharp
None
```

Flag used to indicate no flags set.

## CreateObjectFlags.TrackerObject field

```csharp
TrackerObject
```

Indicates that the supplied external COM object implements the IReferenceTracker.

To be added.

## CreateObjectFlags.UniqueInstance field

```csharp
UniqueInstance
```

Indicates to ignore internal caching and always create a unique instance.

To be added.

## CreateObjectFlags.Unwrap field

```csharp
Unwrap
```

Check if the supplied instance is actually a wrapper and if so return the underlying managed object rather than creating a new wrapper.

This matches the built-in RCW semantics for COM interop.

#### Remarks

This matches the built-in RCW semantics for COM interop.
