---
title: "ICorDebugProcess Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess Interface

Represents a process that is executing managed code. This interface is a subclass of ICorDebugController.

## Methods

|Method|Description|
|------------|-----------------|
|ClearCurrentException Method|Clears the current unmanaged exception on the given thread.|
|EnableLogMessages Method|Enables and disables the sending of log messages to the debugger.|
|EnumerateAppDomains Method|Enumerates all of the application domains in the process.|
|EnumerateObjects Method|Not implemented.|
|GetHandle Method|Gets a handle to the process.|
|GetHelperThreadID Method|Gets the operating system (OS) thread ID for the debugger's internal helper thread.|
|GetID Method|Gets the operating system (OS) ID of the process.|
|GetObject Method|Not implemented.|
|GetThread Method|Gets the ICorDebugThread instance that has the specified OS thread ID.|
|GetThreadContext Method|Gets the context for the given thread.|
|IsOSSuspended Method|Determines whether the thread has been suspended as a result of the debugger stopping the process.|
|IsTransitionStub Method|Determines whether an address is inside a stub that will cause a transition to managed code.|
|ModifyLogSwitch Method|Sets the severity level of the specified log switch.|
|ReadMemory Method|Reads memory from the process.|
|SetThreadContext Method|Sets the context for the given thread.|
|ThreadForFiberCookie Method|Deprecated.|
|WriteMemory Method|Writes data to an area of memory in the process.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
