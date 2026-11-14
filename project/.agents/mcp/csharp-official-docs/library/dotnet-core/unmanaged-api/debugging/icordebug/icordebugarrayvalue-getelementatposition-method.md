---
title: "ICorDebugArrayValue::GetElementAtPosition Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getelementatposition-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::GetElementAtPosition Method

Gets the element at the given position, treating the array as a zero-based, single-dimensional array.

## Syntax

```cpp
HRESULT GetElementAtPosition (
    [in]  ULONG32          nPosition,
    [out] ICorDebugValue   **ppValue
);
```

## Parameters

 `nPosition`
 [in] The position of the element to be retrieved.

 `ppValue`
 [out] A pointer to the address of an ICorDebugValue object that represents the value of the element.

## Remarks

The layout of a multi-dimension array follows the C++ style of array layout.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
