---
title: "ICorDebugThread Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread Interface

Represents a thread in a process. The lifetime of an `ICorDebugThread` instance is the same as the lifetime of the thread it represents.

## Methods

|Method|Description|
|------------|-----------------|
|ClearCurrentException Method|This method is not implemented. Do not use it.|
|CreateEval Method|Creates an ICorDebugEval object that operates on this `ICorDebugThread`.|
|CreateStepper Method|Creates an ICorDebugStepper object that allows stepping through the active frame in this `ICorDebugThread`.|
|EnumerateChains Method|Gets an interface pointer to an ICorDebugChainEnum enumerator that contains all the stack chains in this `ICorDebugThread`.|
|GetActiveChain Method|Gets an interface pointer to the active ICorDebugChain on this `ICorDebugThread`.|
|GetActiveFrame Method|Gets an interface pointer to the active ICorDebugFrame on this `ICorDebugThread`.|
|GetAppDomain Method|Gets an interface pointer to the application domain in which this `ICorDebugThread` is currently executing.|
|GetCurrentException Method|Gets an interface pointer to an ICorDebugValue object that represents an exception currently being thrown by managed code.|
|GetDebugState Method|Gets a CorDebugThreadState value that describes the current debug state of this `ICorDebugThread`.|
|GetHandle Method|Gets the current handle for the active part of this `ICorDebugThread`.|
|GetID Method|Gets the current operating system identifier of the active part of this `ICorDebugThread`.|
|GetObject Method|Gets an interface pointer to the common language runtime (CLR) thread.|
|GetProcess Method|Gets an interface pointer to the process of which this `ICorDebugThread` forms a part.|
|GetRegisterSet Method|Gets an interface pointer to the register set associated with this `ICorDebugThread`.|
|GetUserState Method|Gets a bitwise combination of CorDebugUserState values that describe the current state of this `ICorDebugThread`.|
|SetDebugState Method|Sets a bitwise combination of `CorDebugThreadState` values that describe the debugging state of this `ICorDebugThread`.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
