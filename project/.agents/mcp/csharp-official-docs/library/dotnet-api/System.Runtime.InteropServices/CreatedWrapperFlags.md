---
title: "CreatedWrapperFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CreatedWrapperFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CreatedWrapperFlags enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum CreatedWrapperFlags
```

Specifies flags for `ComWrappers.CreateObject`.

To be added.

## CreatedWrapperFlags.None field

```csharp
None
```

To be added.

## CreatedWrapperFlags.NonWrapping field

```csharp
NonWrapping
```

A managed object that doesn't keep the native object alive. The managed object represents an equivalent value.

## CreatedWrapperFlags.TrackerObject field

```csharp
TrackerObject
```

The supplied external COM object implements the IReferenceTracker.
