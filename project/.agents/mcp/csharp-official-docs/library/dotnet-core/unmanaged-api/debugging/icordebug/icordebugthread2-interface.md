---
title: "ICorDebugThread2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread2 Interface

Serves as a logical extension to the ICorDebugThread interface.

## Methods

|Method|Description|
|------------|-----------------|
|GetActiveFunctions Method|Gets an array of COR_ACTIVE_FUNCTION instances that contain data about the active functions in a thread's frames.|
|GetConnectionID Method|Gets a connection identifier for this `ICorDebugThread2`.|
|GetTaskID Method|Gets a task identifier for this `ICorDebugThread2`.|
|GetVolatileOSThreadID Method|Gets the operating system thread identifier for this `ICorDebugThread2`.|
|InterceptCurrentException Method|Allows a debugger to intercept the current exception on a thread.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
