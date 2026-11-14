---
title: "ICorDebugFunctionBreakpoint::GetFunction Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunctionbreakpoint-getfunction-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunctionBreakpoint::GetFunction Method

Gets an interface pointer to an ICorDebugFunction that references the function in which the breakpoint is set.

## Syntax

```cpp
HRESULT GetFunction (
    [out] ICorDebugFunction  **ppFunction
);
```

## Parameters

 `ppFunction`
 [out] A pointer to the address of the function in which the breakpoint is set.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
