---
title: "CorDebugThreadState Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugthreadstate-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugThreadState Enumeration

Specifies the state of a thread for debugging.

## Syntax

```cpp
typedef enum CorDebugThreadState {
    THREAD_RUN,
    THREAD_SUSPEND
} CorDebugThreadState;
```

## Members

|Member|Description|
|------------|-----------------|
|`THREAD_RUN`|The thread runs freely, unless a debug event occurs.|
|`THREAD_SUSPEND`|The thread cannot run.|

## Remarks

 The debugger uses the `CorDebugThreadState` enumeration to control a thread's execution. The state of a thread can be set by using the ICorDebugThread::SetDebugState or ICorDebugController::SetAllThreadsDebugState method.

 A callback provided to the hosting API enables message pumping, so an interrupted state is not needed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
