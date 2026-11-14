---
title: "ICorDebugHandleValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebughandlevalue-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHandleValue Interface

A subclass of ICorDebugReferenceValue that represents a reference value to which the debugger has created a handle for garbage collection.

## Methods

|Method|Description|
|------------|-----------------|
|Dispose Method|Releases the handle referenced by this `ICorDebugHandleValue` object without explicitly releasing the interface pointer.|
|GetHandleType Method|Gets a CorDebugHandleType value that describes the kind of handle referenced by this `ICorDebugHandleValue`.|

## Remarks

An `ICorDebugReferenceValue` object is invalidated by a break in the execution of debugged code. An `ICorDebugHandleValue` maintains its reference through breaks and continuations, until it is explicitly released.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
