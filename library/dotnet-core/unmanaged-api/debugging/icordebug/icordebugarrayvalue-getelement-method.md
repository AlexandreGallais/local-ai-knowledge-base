---
title: "ICorDebugArrayValue::GetElement Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getelement-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::GetElement Method

Gets the value of the given array element.

## Syntax

```cpp
HRESULT GetElement (
    [in]  ULONG32          cdim,
    [in, size_is(cdim), length_is(cdim)]
         ULONG32           indices[],
    [out] ICorDebugValue   **ppValue
);
```

## Parameters

 `cdim`
 [in] The number of dimensions of this `ICorDebugArrayValue` object.

This value is also the size of the `indices` array because its size is equal to the number of dimensions of the `ICorDebugArrayValue` object.

 `indices`
 [in] An array of index values, each of which specifies a position within a dimension of the `ICorDebugArrayValue` object.

This value must not be null.

 `ppValue`
 [out] A pointer to the address of an ICorDebugValue object that represents the value of the specified element.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
