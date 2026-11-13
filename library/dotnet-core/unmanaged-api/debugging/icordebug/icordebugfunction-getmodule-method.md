---
title: "ICorDebugFunction::GetModule Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-getmodule-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction::GetModule Method

Gets the module in which this function is defined.

## Syntax

```cpp
HRESULT GetModule (
    [out] ICorDebugModule **ppModule
);
```

## Parameters

 `ppModule`
 [out] A pointer to the address of an ICorDebugModule object that represents the module in which this function is defined.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
