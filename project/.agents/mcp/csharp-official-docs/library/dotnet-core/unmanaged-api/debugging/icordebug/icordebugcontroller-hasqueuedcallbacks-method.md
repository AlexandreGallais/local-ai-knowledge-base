---
title: "ICorDebugController::HasQueuedCallbacks Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-hasqueuedcallbacks-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugController::HasQueuedCallbacks Method

Gets a value that indicates whether any managed callbacks are currently queued for the specified thread.

## Syntax

```cpp
HRESULT HasQueuedCallbacks (
    [in] ICorDebugThread *pThread,
    [out] BOOL           *pbQueued
);
```

## Parameters

 `pThread`
 [in] A pointer to an "ICorDebugThread" object that represents the thread.

 `pbQueued`
 [out] A pointer to a value that is `true` if any managed callbacks are currently queued for the specified thread; otherwise, `false`.

If null is specified for the `pThread` parameter, `HasQueuedCallbacks` will return `true` if there are currently managed callbacks queued for any thread.

## Remarks

Callbacks will be dispatched one at a time, each time ICorDebugController::Continue is called. The debugger can check this flag if it wants to report multiple debugging events that occur simultaneously.

When debugging events are queued, they have already occurred, so the debugger must drain the entire queue to be sure of the state of the debuggee. (Call `ICorDebugController::Continue` to drain the queue.) For example, if the queue contains two debugging events on thread *X*, and the debugger suspends thread *X* after the first debugging event and then calls `ICorDebugController::Continue`, the second debugging event for thread *X* will be dispatched although the thread has been suspended.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
