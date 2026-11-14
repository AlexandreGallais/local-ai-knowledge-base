---
title: "ICorDebugAssembly3::GetContainerAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly3-getcontainerassembly-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAssembly3::GetContainerAssembly Method

Returns the container assembly of this `ICorDebugAssembly3` object.

## Syntax

```cpp
HRESULT GetContainerAssembly(
    ICorDebugAssembly **ppAssembly
);
```

## Parameters

 `ppAssembly`
A pointer to the address of an ICorDebugAssembly object that represents the container assembly, or **null** if the method call fails.

## Return Value

 `S_OK` if the method call succeeds; otherwise, `S_FALSE`, and `ppAssembly` is **null**.

## Remarks

If this assembly has been merged with others inside a single container assembly, this method returns the container assembly. For more information and terminology, see the ICorDebugProcess6::EnableVirtualModuleSplitting topic.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugAssembly3 Interface
