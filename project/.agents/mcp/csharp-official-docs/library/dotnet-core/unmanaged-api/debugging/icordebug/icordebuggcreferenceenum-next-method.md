---
title: "ICorDebugGCReferenceEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebuggcreferenceenum-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugGCReferenceEnum::Next Method

Gets the specified number of COR_GC_REFERENCE instances that contain information about objects that will be garbage-collected.

## Syntax

```cpp
HRESULT Next(
    [in] ULONG celt,    [out, size_is(celt), length_is(*pceltFetched)] COR_GC_REFERENCE roots[],
    [out] ULONG *pceltFetched
);
```

## Parameters

celt
 [in] The number of roots to be retrieved.

roots
 [out] An array of pointers, each of which points to a COR_GC_REFERENCE object that represents the root of an object to be garbage-collected.

pceltFetched
 [out] A pointer to the number of COR_GC_REFERENCE objects actually returned in `roots`. This value may be `null` if `celt` is 1.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugGCReferenceEnum Interface
