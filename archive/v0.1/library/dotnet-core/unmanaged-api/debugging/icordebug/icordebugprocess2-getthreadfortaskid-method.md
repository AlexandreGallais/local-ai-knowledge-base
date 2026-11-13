---
title: "ICorDebugProcess2::GetThreadForTaskID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-getthreadfortaskid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
