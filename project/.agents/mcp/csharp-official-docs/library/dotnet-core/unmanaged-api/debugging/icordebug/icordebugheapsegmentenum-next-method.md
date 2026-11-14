---
title: "ICorDebugHeapSegmentEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugheapsegmentenum-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHeapSegmentEnum::Next Method

Gets the specified number of COR_SEGMENT instances that contain information about memory regions of the managed heap.

## Syntax

```cpp
HRESULT Next(
    [in] ULONG celt,    [out, size_is(celt), length_is(*pceltFetched)] COR_SEGMENT segments[],
    [out] ULONG *pceltFetched
);
```

## Parameters

celt
 [in] The number of segments to be retrieved.

segments
 [out] An array of pointers, each of which points to a COR_SEGMENT object that provides information about a region of memory in the managed heap.

pceltFetched
 [out] A pointer to the number of COR_SEGMENT objects actually returned in `segments`. This value may be `null` if `celt` is 1.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugHeapSegmentEnum Interface
