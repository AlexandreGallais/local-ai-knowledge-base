---
title: "ICorDebugChain Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugChain Interface

Represents a segment of a physical or logical call stack.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateFrames Method|Gets an enumerator that contains all the managed stack frames in the chain, starting with the most recent frame.|
|GetActiveFrame Method|Gets the active (that is, most recent) frame on the chain.|
|GetCallee Method|Gets the chain that was called by this chain.|
|GetCaller Method|Gets the chain that called this chain.|
|GetContext Method|Not implemented.|
|GetNext Method|Gets the next chain of frames for the thread.|
|GetPrevious Method|Gets the previous chain of frames for the thread.|
|GetReason Method|Gets the reason for the genesis of this calling chain.|
|GetRegisterSet Method|Gets the register set for the active part of this chain.|
|GetStackRange Method|Gets the address range of the stack segment for this chain.|
|GetThread Method|Gets the physical thread this call chain is part of.|
|IsManaged Method|Gets a value that indicates whether this chain is running managed code.|

## Remarks

The stack frames in a chain occupy contiguous stack space and share the same thread and context. A chain may represent either managed or unmanaged code chains. An empty `ICorDebugChain` instance represents an unmanaged code chain.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
