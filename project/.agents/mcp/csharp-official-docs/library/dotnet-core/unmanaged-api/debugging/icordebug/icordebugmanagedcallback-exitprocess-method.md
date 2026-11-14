---
title: "ICorDebugManagedCallback::ExitProcess Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-exitprocess-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::ExitProcess Method

Notifies the debugger that a process has exited.

## Syntax

```cpp
HRESULT ExitProcess (
    [in] ICorDebugProcess *pProcess
);
```

## Parameters

 `pProcess`
 [in] A pointer to an ICorDebugProcess object that represents the process.

## Remarks

You cannot continue from an `ExitProcess` event. This event may fire asynchronously to other events while the process appears to be stopped. This can occur if the process terminates while stopped, usually due to some external force.

If the common language runtime (CLR) is already dispatching a managed callback, this event will be delayed until after that callback has returned.

The `ExitProcess` event is the only exit/unload event that is guaranteed to get called on shutdown.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
