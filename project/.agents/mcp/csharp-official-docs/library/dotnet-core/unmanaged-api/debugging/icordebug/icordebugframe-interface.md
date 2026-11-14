---
title: "ICorDebugFrame Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFrame Interface

Represents a frame on the current stack.

## Methods

|Method|Description|
|------------|-----------------|
|CreateStepper Method|Gets an ICorDebugStepper to perform stepping operations relative to this `ICorDebugFrame`.|
|GetCallee Method|Gets a pointer to the `ICorDebugFrame` in the current chain that this frame called, or returns null if this is the innermost frame in the chain.|
|GetCaller Method|Gets a pointer to the `ICorDebugFrame` in the current chain that called this frame, or returns null if this is the outermost frame in the chain.|
|GetChain Method|Gets a pointer to the ICorDebugChain this `ICorDebugFrame` is a part of.|
|GetCode Method|Gets a pointer to the ICorDebugCode associated with this stack frame.|
|GetFunction Method|Gets a pointer to the ICorDebugFunction that contains the code associated with this stack frame.|
|GetFunctionToken <example-value>|Gets the metadata token for the function that contains the code associated with this stack frame.|
|GetStackRange Method|Gets the absolute address range of the stack frame represented by this `ICorDebugFrame`.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
