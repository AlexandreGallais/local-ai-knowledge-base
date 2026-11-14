---
title: "ICorDebugModuleBreakpoint::GetModule Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodulebreakpoint-getmodule-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
