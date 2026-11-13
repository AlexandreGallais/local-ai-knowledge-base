---
title: "ICorDebugProcess5::EnumerateHeapRegions Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-enumerateheapregions-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::EnumerateHeapRegions Method

Gets an enumerator for the memory ranges of the managed heap.

## Syntax

```cpp
HRESULT EnumerateHeapRegions(
   [out] ICorDebugHeapSegmentEnum **ppRegions
);
```

## Parameters

 `ppRegions`
 [out] A pointer to the address of an ICorDebugHeapSegmentEnum interface object that is an enumerator for the ranges of memory in which objects reside in the managed heap.

## Remarks

Before calling the `ICorDebugProcess5::EnumerateHeapRegions` method, you should call the ICorDebugProcess5::GetGCHeapInformation method and examine the value of the `areGCStructuresValid` field of the returned COR_HEAPINFO object to ensure that the garbage collection heap in its current state is enumerable. In addition, the `ICorDebugProcess5::EnumerateHeapRegions` method returns `E_FAIL` if you attach too early in the lifetime of the process, before memory regions are created.

This method is guaranteed to enumerate all memory regions that may contain managed objects, but it does not guarantee that managed objects actually reside in those regions. The ICorDebugHeapSegmentEnum collection object may include empty or reserved memory regions.

The ICorDebugHeapSegmentEnum interface object is a standard enumerator derived from the ICorDebugEnum interface that allows you to enumerate COR_SEGMENT objects. Each COR_SEGMENT object provides information about the memory range of a particular segment, along with the generation of the objects in that segment.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
