---
title: "ICorDebugFunctionBreakpoint::GetFunction Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunctionbreakpoint-getfunction-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
