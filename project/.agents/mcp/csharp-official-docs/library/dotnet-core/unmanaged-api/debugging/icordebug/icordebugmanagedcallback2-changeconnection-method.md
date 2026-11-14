---
title: "ICorDebugManagedCallback2::ChangeConnection Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-changeconnection-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2::ChangeConnection Method

Notifies the debugger that the set of tasks associated with the specified connection has changed.

## Syntax

```cpp
HRESULT ChangeConnection (
    [in] ICorDebugProcess     *pProcess,
    [in] CONNID               dwConnectionId
);
```

## Parameters

 `pProcess`
 [in] A pointer to an "ICorDebugProcess" object that represents the process containing the connection that changed.

 `dwConnectionId`
 [in] The ID of the connection that changed.

## Remarks

A `ChangeConnection` callback will be fired in either of the following cases:

- When a debugger attaches to a process that contains connections. In this case, the runtime will generate and dispatch a ICorDebugManagedCallback2::CreateConnection event and a `ChangeConnection` event for each connection in the process. A `ChangeConnection` event is generated for every existing connection, regardless of whether that connection’s set of tasks has been changed since its creation.
- When a host calls ICLRDebugManager::SetConnectionTasks in the hosting API.

The debugger should scan all threads in the process to pick up the new changes.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugManagedCallback2 Interface
- ICorDebugManagedCallback Interface
