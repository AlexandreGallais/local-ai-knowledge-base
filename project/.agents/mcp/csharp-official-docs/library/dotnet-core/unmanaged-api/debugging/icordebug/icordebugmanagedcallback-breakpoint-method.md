---
title: "ICorDebugManagedCallback::Breakpoint Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-breakpoint-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
