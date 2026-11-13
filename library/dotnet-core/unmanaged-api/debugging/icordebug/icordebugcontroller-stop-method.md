---
title: "ICorDebugController::Stop Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-stop-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugController::Stop Method

Performs a cooperative stop on all threads that are running managed code in the process.

## Syntax

```cpp
HRESULT Stop (
    [in] DWORD dwTimeoutIgnored
);
```

## Parameters

 `dwTimeoutIgnored`
Not used.

## Remarks

 `Stop` performs a cooperative stop on all threads running managed code in the process. During a managed-only debugging session, unmanaged threads may continue to run (but will be blocked when trying to call managed code). During an interop debugging session, unmanaged threads will also be stopped. The `dwTimeoutIgnored` value is currently ignored and treated as INFINITE (-1). If the cooperative stop fails due to a deadlock, all threads are suspended and E_TIMEOUT is returned.

> **Note:**
> `Stop` is the only synchronous method in the debugging API. When `Stop` returns S_OK, the process is stopped. No callback is given to notify listeners of the stop. The debugger must call ICorDebugController::Continue to allow the process to resume.

The debugger maintains a stop counter. When the counter goes to zero, the controller is resumed. Each call to `Stop` or each dispatched callback increments the counter. Each call to `ICorDebugController::Continue` decrements the counter.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
