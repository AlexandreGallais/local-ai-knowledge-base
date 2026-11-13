---
title: "ICorDebugObjectEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectenum-next-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
