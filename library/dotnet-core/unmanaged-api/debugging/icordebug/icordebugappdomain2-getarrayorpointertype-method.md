---
title: "ICorDebugAppDomain2::GetArrayOrPointerType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain2-getarrayorpointertype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain2::GetArrayOrPointerType Method

Gets an array of the specified type, or a pointer or reference to the specified type.

## Syntax

```cpp
HRESULT GetArrayOrPointerType (
    [in]  CorElementType    elementType,
    [in]  ULONG32           nRank,
    [in]  ICorDebugType     *pTypeArg,
    [out] ICorDebugType     **ppType
);
```

## Parameters

 `elementType`
 [in] A value of the CorElementType enumeration that specifies the underlying native type (an array, pointer, or reference) to be created.

 `nRank`
 [in] The rank (that is, number of dimensions) of the array. This value must be 0 if `elementType` specifies a pointer or reference type.

 `pTypeArg`
 [in] A pointer to an ICorDebugType object that represents the type of array, pointer, or reference to be created.

 `ppType`
 [out] A pointer to the address of an `ICorDebugType` object that represents the constructed array, pointer type, or reference type.

## Remarks

The value of *elementType* must be one of the following:

- ELEMENT_TYPE_PTR

- ELEMENT_TYPE_BYREF

- ELEMENT_TYPE_ARRAY or ELEMENT_TYPE_SZARRAY

If the value of *elementType* is ELEMENT_TYPE_PTR or ELEMENT_TYPE_BYREF, *nRank* must be zero.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
