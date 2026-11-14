---
title: "ICorDebugController::SetAllThreadsDebugState Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-setallthreadsdebugstate-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugController::SetAllThreadsDebugState Method

Sets the debug state of all managed threads in the process.

## Syntax

```cpp
HRESULT SetAllThreadsDebugState (
    [in] CorDebugThreadState  state,
    [in] ICorDebugThread      *pExceptThisThread
);
```

## Parameters

 `state`
 [in] A value of the "CorDebugThreadState" enumeration that specifies the state of the thread for debugging.

 `pExceptThisThread`
 [in] A pointer to an "ICorDebugThread" object that represents a thread to be exempted from the debug state setting. If this value is null, no thread is exempted.

## Remarks

The `SetAllThreadsDebugState` method may affect threads that are not visible via EnumerateThreads Method, so threads that were suspended with the `SetAllThreadsDebugState` method will need to be resumed with the `SetAllThreadsDebugState` method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
