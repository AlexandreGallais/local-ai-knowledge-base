---
title: "ICorDebugHeapSegmentEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugheapsegmentenum-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugHeapSegmentEnum Interface

Provides an enumerator for the memory regions of the managed heap. This interface is a subclass of the ICorDebugEnum interface.

## Methods

|Method|Description|
|------------|-----------------|
|Next Method|Gets the specified number of COR_SEGMENT instances that contain information about regions of the managed heap.|

## Remarks

The `ICorDebugHeapSegmentEnum` interface implements the ICorDebugEnum interface.

An `ICorDebugHeapSegmentEnum` instance is populated with COR_SEGMENT instances by calling the ICorDebugProcess5::EnumerateHeapRegions method. The COR_SEGMENT objects in the collection can be enumerated by calling the ICorDebugHeapSegmentEnum::Next method.

An `ICorDebugHeapSegmentEnum` collection object enumerates all memory regions that may contain managed objects, but it does not guarantee that managed objects actually reside in those regions. It may include information about empty or reserved memory regions.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
