---
title: "ICorDebugArrayValue::GetBaseIndicies Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getbaseindicies-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::GetBaseIndicies Method

Gets the base index of each dimension in the array.

## Syntax

```cpp
HRESULT GetBaseIndicies (
    [in] ULONG32          cdim,
    [out, size_is(cdim), length_is(cdim)]
        ULONG32           indicies[]
);
```

## Parameters

 `cdim`
 [in] The number of dimensions of this `ICorDebugArrayValue` object. This value is also the size of the `indicies` array because its size is equal to the number of dimensions of the `ICorDebugArrayValue` object.

 `indicies`
 [out] An array of integers, each of which is the base index (that is, the starting index) of a dimension of this `ICorDebugArrayValue` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
