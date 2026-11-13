---
title: "ICorDebugManagedCallback::BreakpointSetError Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-breakpointseterror-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::BreakpointSetError Method

Notifies the debugger that the common language runtime was unable to accurately bind a breakpoint that was set before a function was just-in-time (JIT) compiled.

## Syntax

```cpp
HRESULT BreakpointSetError (
    [in] ICorDebugAppDomain  *pAppDomain,
    [in] ICorDebugThread     *pThread,
    [in] ICorDebugBreakpoint *pBreakpoint,
    [in] DWORD                dwError
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain that contains the unbound breakpoint.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread that contains the unbound breakpoint.

 `pBreakpoint`
 [in] A pointer to an ICorDebugBreakpoint object that represents the unbound breakpoint.

 `dwError`
 [in] An integer that indicates the error.

## Remarks

The given breakpoint will never be hit. The debugger should deactivate and rebind it.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
