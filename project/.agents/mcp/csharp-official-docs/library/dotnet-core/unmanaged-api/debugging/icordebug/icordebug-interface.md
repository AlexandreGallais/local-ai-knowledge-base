---
title: "ICorDebug Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebug Interface

Provides methods that allow developers to debug applications in the common language runtime (CLR) environment.

> **Note:**
> Mixed-mode (managed and native code) debugging is not supported on non-x86 platforms (such as IA64 and AMD64).

## Methods

| Method                                                            | Description |
|-------------------------------------------------------------------|-------------|
| CanLaunchOrAttach Method | Determines whether launching a new process or attaching to the given process is possible within the context of the current machine and runtime configuration. |
|CreateProcess Method|Launches a process and its primary thread under the control of the debugger.|
|DebugActiveProcess Method|Attaches the debugger to an existing process.|
|EnumerateProcesses Method|Gets an enumerator for the processes that are being debugged.|
|GetProcess Method|Returns the "ICorDebugProcess" object with the given process ID.|
|Initialize Method|Initializes the `ICorDebug` object.|
|SetManagedHandler Method|Specifies the event handler object for managed events.|
|SetUnmanagedHandler Method|Specifies the event handler object for unmanaged events.|
|Terminate Method|Terminates the `ICorDebug` object.|

## Remarks

 `ICorDebug` represents an event processing loop for a debugger process. The debugger must wait for the ICorDebugManagedCallback::ExitProcess callback from all processes being debugged before releasing this interface.

The `ICorDebug` object must be created by the CreateDebuggingInterfaceFromVersion function function, which allows clients to get a specific implementation of `ICorDebug` that emulates a specific version of the debugging API.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
