---
title: "ICorDebugHeapValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugheapvalue-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugHeapValue Interface

A subclass of "ICorDebugValue" that represents an object that has been collected by the common language runtime (CLR) garbage collector.

## Methods

|Method|Description|
|------------|-----------------|
|CreateRelocBreakpoint Method|Not implemented.|
|IsValid Method|Gets a value that indicates whether the object represented by this `ICorDebugHeapValue` is valid, or has been reclaimed by the garbage collector. This method has been deprecated.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
