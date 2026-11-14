---
title: "ICorDebugFunction::CreateBreakpoint Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-createbreakpoint-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunction::CreateBreakpoint Method

Creates a breakpoint at the beginning of this function.

## Syntax

```cpp
HRESULT CreateBreakpoint (
    [out] ICorDebugFunctionBreakpoint **ppBreakpoint
);
```

## Parameters

 `ppBreakpoint`
 [out] A pointer to the address of an ICorDebugFunctionBreakpoint object that represents the new breakpoint for the function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
