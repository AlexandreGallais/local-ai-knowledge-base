---
title: "CreateComInterfaceFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CreateComInterfaceFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CreateComInterfaceFlags enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum CreateComInterfaceFlags
```

Specifies flags for the `ComWrappers.GetOrCreateComInterfaceForObject` method.

To be added.

## CreateComInterfaceFlags.CallerDefinedIUnknown field

```csharp
CallerDefinedIUnknown
```

The caller will provide an IUnknown Vtable.

This flag is useful in scenarios when the caller has no need to rely on an IUnknown instance that's used when it's not possible to run managed code (that is, during a garbage collection). This is common in traditional COM scenarios, but scenarios where Reference Tracker hosting calls the IUnknown API during a garbage collection are possible.

#### Remarks

This is useful in scenarios when the caller has no need to rely on an IUnknown instance
that is used when running managed code is not possible (that is, during a GC). In traditional
COM scenarios this is common, but scenarios involving Reference Tracker hosting
calling of the IUnknown API during a GC are possible.

## CreateComInterfaceFlags.None field

```csharp
None
```

Flag used to indicate no flags set.

## CreateComInterfaceFlags.TrackerSupport field

```csharp
TrackerSupport
```

Flag used to indicate the COM interface should implement IReferenceTrackerTarget.

When this flag is passed, the resulting COM interface will have an internal implementation of IUnknown, therefore, none should be supplied by the caller.
