---
title: "ComWrappers+ComInterfaceEntry struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComWrappers+ComInterfaceEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComWrappers+ComInterfaceEntry struct

Namespace: `System.Runtime.InteropServices`

```csharp
public struct ComWrappers.ComInterfaceEntry
```

Interface type and pointer to targeted VTable.

To be added.

## ComWrappers+ComInterfaceEntry.IID field

```csharp
public Guid IID;
```

Interface identifier.

To be added.

## ComWrappers+ComInterfaceEntry.Vtable field

```csharp
public IntPtr Vtable;
```

A pointer to the virtual lookup table of functions.

#### Remarks

Memory must have the same lifetime as the memory returned from the call to `ComputeVtables`.
