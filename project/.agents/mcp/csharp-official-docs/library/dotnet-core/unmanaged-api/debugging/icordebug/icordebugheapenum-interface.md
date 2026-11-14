---
title: "ICorDebugHeapEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugheapenum-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHeapEnum Interface

Provides an enumerator for objects on the managed heap. This interface is a subclass of the ICorDebugEnum interface.

## Methods

|Method|Description|
|------------|-----------------|
|Next Method|Gets the specified number of COR_HEAPOBJECT instances that contain information about objects on the managed heap.|

## Remarks

The `ICorDebugHeapEnum` interface implements the ICorDebugEnum interface.

An `ICorDebugHeapEnum` instance is populated with COR_HEAPOBJECT instances by calling the ICorDebugProcess5::EnumerateHeap method. Each COR_HEAPOBJECT instance in the collection represents either a live object on the heap or an object that is not rooted by any object but has not yet been collected by the garbage collector. The COR_HEAPOBJECT objects in the collection can be enumerated by calling the ICorDebugHeapEnum::Next method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
