---
title: "ICorDebugManagedCallback::Breakpoint Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-breakpoint-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::Breakpoint Method

Notifies the debugger when a breakpoint is encountered.

## Syntax

```cpp
HRESULT Breakpoint (
    [in] ICorDebugAppDomain  *pAppDomain,
    [in] ICorDebugThread     *pThread,
    [in] ICorDebugBreakpoint *pBreakpoint
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain that contains the breakpoint.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread that contains the breakpoint.

 `pBreakpoint`
 [in] A pointer to an ICorDebugBreakpoint object that represents the breakpoint.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
