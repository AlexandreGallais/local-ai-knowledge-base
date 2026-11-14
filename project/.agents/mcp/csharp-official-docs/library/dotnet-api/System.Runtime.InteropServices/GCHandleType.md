---
title: "GCHandleType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/GCHandleType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCHandleType enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum GCHandleType
```

Represents the types of handles the `GCHandle` type can allocate.

To be added.

## GCHandleType.Normal field

```csharp
Normal
```

This handle type represents an opaque handle, meaning you cannot resolve the address of the pinned object through the handle. You can use this type to track an object and prevent its collection by the garbage collector. This enumeration member is useful when an unmanaged client holds the only reference, which is undetectable from the garbage collector, to a managed object.

## GCHandleType.Pinned field

```csharp
Pinned
```

This handle type is similar to `GCHandleType.Normal`, but allows the address of the pinned object to be taken. This prevents the garbage collector from moving the object and hence undermines the efficiency of the garbage collector. Use the `GCHandle.Free` method to free the allocated handle as soon as possible.

## GCHandleType.Weak field

```csharp
Weak
```

This handle type is used to track an object, but allow it to be collected. When an object is collected, the contents of the `GCHandle` are zeroed. `Weak` references are zeroed before the finalizer runs, so even if the finalizer resurrects the object, the `Weak` reference is still zeroed.

## GCHandleType.WeakTrackResurrection field

```csharp
WeakTrackResurrection
```

This handle type is similar to `GCHandleType.Weak`, but the handle is not zeroed if the object is resurrected during finalization.
