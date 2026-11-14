---
title: "ICorDebugProcess2::GetThreadForTaskID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-getthreadfortaskid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess2::GetThreadForTaskID Method

Gets the thread on which the task with the specified identifier is executing.

## Syntax

```cpp
HRESULT GetThreadForTaskID (
    [in]  TASKID            taskid,
    [out] ICorDebugThread2  **ppThread
);
```

## Parameters

 `taskid`
 [in] The identifier of the task.

 `ppThread`
 [out] A pointer to the address of an ICorDebugThread2 object that represents the thread to be retrieved.

## Remarks

The host can set the task identifier by using the ICLRTask::SetTaskIdentifier method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
