---
title: "ICorDebugManagedCallback2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2 Interface

Provides methods to support debugger exception handling and managed debugging assistants (MDAs). `ICorDebugManagedCallback2` is a logical extension of the ICorDebugManagedCallback interface.

## Methods

|Method|Description|
|------------|-----------------|
|ChangeConnection Method|Notifies the debugger that the set of tasks associated with the specified connection has changed.|
|CreateConnection Method|Notifies the debugger that a new connection has been created.|
|DestroyConnection Method|Notifies the debugger that the specified connection has been terminated.|
|Exception Method|Notifies the debugger that a search for an exception handler has started.|
|ExceptionUnwind Method|Provides a status notification during the exception unwinding process.|
|FunctionRemapComplete Method|Notifies the debugger that code execution has switched to a new version of an edited function.|
|FunctionRemapOpportunity Method|Notifies the debugger that code execution has reached a sequence point in an older version of an edited function.|
|MDANotification Method|Provides notification that code execution has encountered a managed debugging assistant (MDA) message.|

## Remarks

The `ICorDebugManagedCallback2` interface extends the `ICorDebugManagedCallback` interface to handle new debug events introduced in .NET Framework 2.0.

A debugger must implement `ICorDebugManagedCallback2`. An instance of `ICorDebugManagedCallback` or `ICorDebugManagedCallback2` is passed as the callback object to ICorDebug::SetManagedHandler.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- Diagnose Errors with Managed Debugging Assistants
- ICorDebugManagedCallback Interface
