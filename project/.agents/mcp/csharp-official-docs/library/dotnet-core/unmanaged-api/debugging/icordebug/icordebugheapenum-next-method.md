---
title: "ICorDebugHeapEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugheapenum-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHeapEnum::Next Method

Gets the specified number of COR_HEAPOBJECT instances that contain information about objects on the managed heap.

## Syntax

```cpp
HRESULT Next(
    [in] ULONG celt,    [out, size_is(celt), length_is(*pceltFetched)] COR_HEAPOBJECT  objects[],
    [out] ULONG *pceltFetched
);
```

## Parameters

celt
 [in] The number of objects to be retrieved.

objects
 [out] An array of pointers, each of which points to a COR_HEAPOBJECT object that provides information about an object on the managed heap.

pceltFetched
 [out] A pointer to the number of COR_HEAPOBJECT objects actually returned in `objects`. This value may be `null` if `celt` is 1.

## Remarks

The `COR_HEAPOBJECT.type` field is the identifier of a nested reference-counted COM interface. This reference must be released by the caller of `ICorDebugHeapEnum::Next`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugHeapEnum Interface
