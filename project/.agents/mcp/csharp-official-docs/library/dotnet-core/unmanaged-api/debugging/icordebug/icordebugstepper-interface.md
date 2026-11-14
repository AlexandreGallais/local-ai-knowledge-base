---
title: "ICorDebugStepper Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStepper Interface

Represents a step in code execution that is performed by a debugger, serves as an identifier between the issuance and completion of a command, and provides a way to cancel a step.

## Methods

|Method|Description|
|------------|-----------------|
|Deactivate Method|Causes this `ICorDebugStepper` to cancel the last step command it received.|
|IsActive Method|Gets a value that indicates whether this `ICorDebugStepper` is currently executing a step.|
|SetInterceptMask Method|Sets a CorDebugIntercept value that specifies the types of code that are stepped into.|
|SetRangeIL Method|Sets a value that indicates whether calls to ICorDebugStepper::StepRange pass <example-value> values relative to the native code or to common intermediate language (CIL) code of the method that is being stepped through.|
|SetUnmappedStopMask Method|Sets a CorDebugUnmappedStop value that specifies the type of unmapped code in which execution will halt.|
|Step Method|Causes this `ICorDebugStepper` to single-step through its containing thread, and optionally, to continue single-stepping through functions that are called within the thread.|
|StepOut Method|Causes this `ICorDebugStepper` to single-step through its containing thread, and to complete when the current frame returns control to the calling frame.|
|StepRange Method|Causes this `ICorDebugStepper` to single-step through its containing thread, and to return when it reaches code beyond the last of the specified ranges.|

## Remarks

The `ICorDebugStepper` interface serves the following purposes:

- It acts as an identifier between a step command that is issued and the completion of that command.

- It provides a central interface to encapsulate all the stepping that can be performed.

- It provides a way to prematurely cancel a stepping operation.

There can be more than one stepper per thread. For example, a breakpoint may be hit while stepping over a function, and the user may wish to start a new stepping operation inside that function. It is up to the debugger to determine how to handle this situation. The debugger may want to cancel the original stepping operation or nest the two operations. The `ICorDebugStepper` interface supports both choices.

A stepper may migrate between threads if the common language runtime (CLR) makes a cross-threaded, marshalled call.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
