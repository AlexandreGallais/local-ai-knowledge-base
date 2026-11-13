---
title: "ICorDebugReferenceValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugreferencevalue-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugReferenceValue Interface

Provides methods that manage a value that is a reference to an object. (That is, this interface provides methods that manage a pointer.) This interface implements "ICorDebugValue".

## Methods

|Method|Description|
|------------|-----------------|
|Dereference Method|Gets the object that is referenced.|
|DereferenceStrong Method|Not implemented. Do not call this method.|
|GetValue Method|Gets the current memory address of the referenced object.|
|IsNull Method|Gets a value that indicates whether this `ICorDebugReferenceValue` is a null value, in which case the `ICorDebugReferenceValue` does not point to an object.|
|SetValue Method|Sets the current memory address. That is, this method sets this `ICorDebugReferenceValue` to point to an object.|

## Remarks

The common language runtime (CLR) may do a garbage collection on objects when the debugged process is continued. The garbage collection may move objects around in memory. An `ICorDebugReferenceValue` will either cooperate with the garbage collection so that its information is updated after the garbage collection, or it will be invalidated implicitly before the garbage collection.

The `ICorDebugReferenceValue` object may be implicitly invalidated after the debugged process has been continued. The derived "ICorDebugHandleValue" is not invalidated until it is explicitly released or exposed.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
