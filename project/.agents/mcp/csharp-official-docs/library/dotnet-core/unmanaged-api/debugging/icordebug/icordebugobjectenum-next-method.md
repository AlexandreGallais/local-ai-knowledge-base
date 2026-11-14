---
title: "ICorDebugObjectEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectenum-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugObjectEnum::Next Method

Gets the relative virtual addresses (RVAs) of the specified number of objects from the enumeration, starting at the current position.

## Syntax

```cpp
HRESULT Next (
    [in] ULONG celt,
    [out, size_is(celt), length_is(*pceltFetched)]
        CORDB_ADDRESS objects[],
    [out] ULONG *pceltFetched
);
```

## Parameters

 `celt`
 [in] The number of objects to be retrieved.

 `objects`
 [out] An array of pointers, each of which points to a CORDB_ADDRESS object.

 `pceltFetched`
 [out] Pointer to the number of objects actually returned. This value may be null if `celt` is one.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
