---
title: "ICorDebugEval2::NewParameterizedArray Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval2-newparameterizedarray-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval2::NewParameterizedArray Method

Allocates a new array of the specified element type and dimensions.

## Syntax

```cpp
HRESULT NewParameterizedArray(
    [in] ICorDebugType          *pElementType,
    [in] ULONG32                rank,
    [in, size_is(rank)] ULONG32 dims[],
    [in, size_is(rank)] ULONG32 lowBounds[]
);
```

## Parameters

 `pElementType`
 [in] A pointer to an ICorDebugType object that represents the type of element stored in the array.

 `rank`
 [in] The number of dimensions of the array.

 `dims`
 [in] The size, in bytes, of each dimension of the array.

 `lowBounds`
 [in] Optional. The lower bound of each dimension of the array. If this value is omitted, a lower bound of zero is assumed for each dimension.

## Remarks

The elements of the array may be instances of a generic type. The array is always created in the application domain in which the thread is currently running.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
