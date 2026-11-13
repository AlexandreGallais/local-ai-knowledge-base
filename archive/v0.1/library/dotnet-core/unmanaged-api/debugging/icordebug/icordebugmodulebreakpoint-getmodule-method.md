---
title: "ICorDebugModuleBreakpoint::GetModule Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodulebreakpoint-getmodule-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModuleBreakpoint::GetModule Method

Gets an interface pointer to an "ICorDebugModule" that references the module in which this breakpoint is set.

## Syntax

```cpp
HRESULT GetModule (
    [out] ICorDebugModule   **ppModule
);
```

## Parameters

 `ppModule`
 [out] A pointer to the address of an `ICorDebugModule` interface that references the module in which the breakpoint is set.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
