---
title: "ICorDebugThread2::GetTaskID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-gettaskid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread2::GetTaskID Method

Gets the identifier of the task running on this thread.

## Syntax

```cpp
HRESULT GetTaskID (
    [out] TASKID  *pTaskId
);
```

## Parameters

 `pTaskId`
 [out] A pointer to the identifier of the task running on the thread represented by this ICorDebugThread2 object.

## Remarks

A task can only be running on the thread if the thread is associated with a connection. `GetTaskID` returns zero in `pTaskId` if the thread is not associated with a connection.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
