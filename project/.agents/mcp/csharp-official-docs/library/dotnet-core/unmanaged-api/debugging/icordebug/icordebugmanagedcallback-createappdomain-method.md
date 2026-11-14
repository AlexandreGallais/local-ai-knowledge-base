---
title: "ICorDebugManagedCallback::CreateAppDomain Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-createappdomain-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::CreateAppDomain Method

Notifies the debugger that an application domain has been created.

## Syntax

```cpp
HRESULT CreateAppDomain (
    [in] ICorDebugProcess   *pProcess,
    [in] ICorDebugAppDomain *pAppDomain
);
```

## Parameters

 `pProcess`
 [in] A pointer to an ICorDebugProcess object that represents the process in which the application domain was created.

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain that has been created.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
