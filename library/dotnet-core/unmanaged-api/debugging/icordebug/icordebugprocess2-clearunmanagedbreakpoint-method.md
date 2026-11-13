---
title: "ICorDebugProcess2::ClearUnmanagedBreakpoint Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-clearunmanagedbreakpoint-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess2::ClearUnmanagedBreakpoint Method

Removes a previously set breakpoint at the given address.

## Syntax

```cpp
HRESULT ClearUnmanagedBreakpoint (
    [in] CORDB_ADDRESS   address
);
```

## Parameters

 `address`
 [in] A `CORDB_ADDRESS` value that specifies the address at which the breakpoint was set.

## Remarks

The specified breakpoint would have been previously set by an earlier call to ICorDebugProcess2::SetUnmanagedBreakpoint.

The `ClearUnmanagedBreakpoint` method can be called while the process being debugged is running.

The `ClearUnmanagedBreakpoint` method returns a failure code if the debugger is attached in managed-only mode or if no breakpoint exists at the specified address.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
