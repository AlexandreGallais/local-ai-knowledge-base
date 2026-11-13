---
title: "ICorDebugClass::GetModule Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugclass-getmodule-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugClass::GetModule Method

Gets the module that defines this class.

## Syntax

```cpp
HRESULT GetModule (
    [out] ICorDebugModule    **pModule
);
```

## Parameters

 `pModule`
 [out] A pointer to the address of an ICorDebugModule object that represents the module in which this class is defined.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
