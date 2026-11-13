---
title: "ICorDebugManagedCallback2::CreateConnection Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-createconnection-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2::CreateConnection Method

Notifies the debugger that a new connection has been created.

## Syntax

```cpp
HRESULT CreateConnection (
    [in] ICorDebugProcess     *pProcess,
    [in] CONNID               dwConnectionId,
    [in] WCHAR                *pConnName
);
```

## Parameters

 `pProcess`
 [in] A pointer to an "ICorDebugProcess" object that represents the process in which the connection was created

 `dwConnectionId`
 [in] The ID of the new connection.

 `pConnName`
 [in] A pointer to the name of the new connection.

## Remarks

A `CreateConnection` callback will be fired in either of the following cases:

- When a debugger attaches to a process that contains connections. In this case, the runtime will generate and dispatch a `CreateConnection` event and a ICorDebugManagedCallback2::ChangeConnection event for each connection in the process.
- When a host calls ICLRDebugManager::BeginConnection in the hosting API.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugManagedCallback2 Interface
- ICorDebugManagedCallback Interface
