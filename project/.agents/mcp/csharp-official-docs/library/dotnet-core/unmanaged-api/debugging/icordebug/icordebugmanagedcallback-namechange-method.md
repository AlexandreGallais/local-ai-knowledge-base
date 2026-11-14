---
title: "ICorDebugManagedCallback::NameChange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-namechange-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::NameChange Method

Notifies the debugger that the name of either an application domain or a thread has changed.

## Syntax

```cpp
HRESULT NameChange (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugThread    *pThread
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain that either had a name change or that contains the thread that had a name change.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread that had a name change.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
