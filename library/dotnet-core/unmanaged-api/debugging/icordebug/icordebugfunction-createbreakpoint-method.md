---
title: "ICorDebugFunction::CreateBreakpoint Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-createbreakpoint-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
