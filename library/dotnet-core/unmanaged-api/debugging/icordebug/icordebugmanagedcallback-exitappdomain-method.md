---
title: "ICorDebugManagedCallback::ExitAppDomain Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-exitappdomain-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::ExitAppDomain Method

Notifies the debugger that an application domain has exited.

## Syntax

```cpp
HRESULT ExitAppDomain (
    [in] ICorDebugProcess   *pProcess,
    [in] ICorDebugAppDomain *pAppDomain
);
```

## Parameters

 `pProcess`
 [in] A pointer to an ICorDebugProcess object that represents the process that contains the given application domain.

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain that has exited.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
