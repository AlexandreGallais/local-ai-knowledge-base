---
title: "ICorDebugManagedCallback2::DestroyConnection Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-destroyconnection-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2::DestroyConnection Method

Notifies the debugger that the specified connection has been terminated.

## Syntax

```cpp
HRESULT DestroyConnection (
    [in] ICorDebugProcess     *pProcess,
    [in] CONNID               dwConnectionId
);
```

## Parameters

 `pProcess`
 [in] A pointer to an ICorDebugProcess object that represents the process containing the connection that was destroyed.

 `dwConnectionId`
 [in] The ID of the connection that was destroyed.

## Remarks

A `DestroyConnection` callback will be fired when a host calls ICLRDebugManager::EndConnection in the hosting API.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugManagedCallback2 Interface
- ICorDebugManagedCallback Interface
