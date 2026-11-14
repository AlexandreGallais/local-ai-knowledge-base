---
title: "ICorDebugProcess2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-interface1.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess2 Interface

A logical extension of the ICorDebugProcess interface, which represents a process running managed code.

## Methods

|Method|Description|
|------------|-----------------|
|ClearUnmanagedBreakpoint Method|Removes a breakpoint at the specified offset that was set by an earlier call to `ICorDebugProcess2::SetUnmanagedBreakpoint`.|
|GetDesiredNGENCompilerFlags Method|Gets the flags that must be set for the common language runtime (CLR) to load the image into the process referenced by this `ICorDebugProcess2`.|
|GetReferenceValueFromGCHandle Method|Gets a reference pointer to the specified managed object that has a garbage collection handle.|
|GetThreadForTaskID Method|Gets the thread upon which the task with the specified identifier is executing.|
|GetVersion Method|Gets the version of the CLR upon which the process being debugged is running.|
|SetDesiredNGENCompilerFlags Method|Sets the flags that are required for the just-in-time (JIT) compiler to load an image into the process being debugged.|
|SetUnmanagedBreakpoint Method|Sets an unmanaged breakpoint at the specified native image offset.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
