---
title: "ICorDebugGCReferenceEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebuggcreferenceenum-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugGCReferenceEnum Interface

Provides an enumerator for objects that will be garbage-collected.

## Methods

|Method|Description|
|------------|-----------------|
|Next Method|Gets the specified number of COR_GC_REFERENCE instances that contain information about objects that will be garbage-collected.|

## Remarks

The `ICorDebugGCReferenceEnum` interface implements the "ICorDebugEnum" interface.

An `ICorDebugGCReferenceEnum` instance is populated with COR_GC_REFERENCE instances by calling the ICorDebugProcess5::EnumerateGCReferences method. COR_GC_REFERENCE objects can be enumerated by calling the ICorDebugGCReference::Next method.

The COR_GC_REFERENCE objects in the collection populated by this method represent three kinds of objects:

- Objects from all managed stacks. This includes live references in managed code as well as objects created by the common language runtime.

- Objects from the handle table. This includes strong references (`HNDTYPE_STRONG` and `HNDTYPE_REFCOUNT`) and static variables in a module.

- Objects from the finalizer queue. The finalizer queue roots objects until the finalizer has run.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
