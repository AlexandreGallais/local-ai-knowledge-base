---
title: "ICorDebugCode::CreateBreakpoint Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-createbreakpoint-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode::CreateBreakpoint Method

Creates a breakpoint in this code segment at the specified offset.

## Syntax

```cpp
HRESULT CreateBreakpoint (
    [in] ULONG32     offset,
    [out] ICorDebugFunctionBreakpoint **ppBreakpoint
);
```

## Parameters

 `offset`
 [in] The offset at which to create the breakpoint.

 `ppBreakpoint`
 [out] A pointer to the address of an "ICorDebugFunctionBreakpoint" object that represents the breakpoint.

## Remarks

Before the breakpoint is active, it must be added to the process object.

If this code is common intermediate language (CIL) code, and there is a just-in-time (JIT)-compiled, native version of the code, the breakpoint will be applied in the JIT-compiled code as well. (The same is true if the code is JIT-compiled later.)

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
