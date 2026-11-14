---
title: "ICorDebugController Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugController Interface

Represents a scope, either a `System.Diagnostics.Process` or an `System.AppDomain`, in which code execution context can be controlled.

## Methods

|Method|Description|
|------------|-----------------|
|`ICorDebugController::CanCommitChanges`|This method is obsolete.|
|`ICorDebugController::CommitChanges`|This method is obsolete.|
|Continue Method|Resumes execution of managed threads after a call to ICorDebugController::Stop.|
|Detach Method|Detaches the debugger from the process or application domain.|
|EnumerateThreads Method|Gets an enumerator for the active managed threads in the process.|
|HasQueuedCallbacks Method|Gets a value that indicates whether any managed callbacks are currently queued for the specified thread.|
|IsRunning Method|Gets a value that indicates whether the threads in the process are currently running freely.|
|SetAllThreadsDebugState Method|Sets the debug state of all managed threads in the process.|
|Stop Method|Performs a cooperative stop on all threads that are running managed code in the process.|
|Terminate Method|Terminates the process with the specified exit code.|

## Remarks

If `ICorDebugController` is controlling a process, the scope includes all threads of the process. If `ICorDebugController` is controlling an application domain, the scope includes only the threads of that particular application domain.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
