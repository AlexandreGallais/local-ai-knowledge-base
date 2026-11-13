---
title: "ICorDebugArrayValue::GetDimensions Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getdimensions-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::GetDimensions Method

Gets the number of elements in each dimension of this array.

## Syntax

```cpp
HRESULT GetDimensions (
    [in] ULONG32         cdim,
    [out, size_is(cdim), length_is(cdim)]
        ULONG32          dims[]
);
```

## Parameters

 `cdim`
 [in] The number of dimensions of this ICorDebugArrayValue object.

This value is also the size of the `dims` array because its size is equal to the number of dimensions of the `ICorDebugArrayValue` object.

 `dims`
 [out] An array of integers, each of which specifies the number of elements in a dimension in this `ICorDebugArrayValue` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
