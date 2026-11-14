---
title: "ComWrappers+ComInterfaceDispatch struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComWrappers+ComInterfaceDispatch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComWrappers+ComInterfaceDispatch struct

Namespace: `System.Runtime.InteropServices`

```csharp
public struct ComWrappers.ComInterfaceDispatch
```

An application binary interface for function dispatch of a COM interface.

To be added.

## ComWrappers+ComInterfaceDispatch.GetInstance<T>(ComWrappers+ComInterfaceDispatch*) method

```csharp
public static T GetInstance<T> (System.Runtime.InteropServices.ComWrappers.ComInterfaceDispatch* dispatchPtr) where T : class;
```

Given an `IntPtr` from a generated Vtable, converts it to the target type.

Parameters:

- `T`: Desired type.
- `dispatchPtr`: Pointer to Vtable function entry.

Returns: An instance of the type associated with the dispatched function call.

To be added.

## ComWrappers+ComInterfaceDispatch.Vtable field

```csharp
public IntPtr Vtable;
```

Field that represents the virtual function table (vtable) in the IUnknown instance layout.

To be added.
