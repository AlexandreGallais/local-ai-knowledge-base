---
title: "ICorDebugArrayValue::GetDimensions Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getdimensions-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
