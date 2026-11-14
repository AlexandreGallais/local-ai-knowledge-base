---
title: "ICorDebugProcess5::EnumerateHeap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-enumerateheap-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::EnumerateHeap Method

Gets an enumerator for the objects on the managed heap.

## Syntax

```cpp
HRESULT EnumerateHeap(
    [out] ICorDebugHeapEnum **ppObjects
);
```

## Parameters

 `ppObject`
 [out] A pointer to the address of an ICorDebugHeapEnum interface object that is an enumerator for the objects that reside on the managed heap.

## Remarks

Before calling the `ICorDebugProcess5::EnumerateHeap` method, you should call the ICorDebugProcess5::GetGCHeapInformation method and examine the value of the `areGCStructuresValid` field of the returned COR_HEAPINFO object to ensure that the garbage collection heap in its current state is enumerable. In addition, the `ICorDebugProcess5::EnumerateHeap` returns `E_FAIL` if you attach too early in the lifetime of the process, before memory for the managed heap is allocated.

The ICorDebugHeapEnum interface object is a standard enumerator derived from the ICorDebugEnum interface that allows you to enumerate COR_HEAPOBJECT objects. This method populates the ICorDebugHeapEnum collection object with COR_HEAPOBJECT instances that provide information about all objects. The collection may also include COR_HEAPOBJECT instances that provide information about objects that are not rooted by any object but have not yet been collected by the garbage collector.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
