---
title: "ICorDebugType::EnumerateTypeParameters Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-enumeratetypeparameters-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugType::EnumerateTypeParameters Method

Gets an interface pointer to an ICorDebugTypeEnum that contains the `System.Type` parameters of the class referenced by this ICorDebugType.

## Syntax

```cpp
HRESULT EnumerateTypeParameters (
    [out] ICorDebugTypeEnum   **ppTyParEnum
);
```

## Parameters

 `ppTyParEnum`
 [out] A pointer to the address of an `ICorDebugTypeEnum` that contains the parameters of the type.

## Remarks

You can use `EnumerateTypeParameters` if the CorElementType value returned by ICorDebugType::GetType is ELEMENT_TYPE_CLASS, ELEMENT_TYPE_VALUETYPE, ELEMENT_TYPE_ARRAY, ELEMENT_TYPE_SZARRAY, ELEMENT_TYPE_BYREF, ELEMENT_TYPE_PTR, or ELEMENT_TYPE_FNPTR. The number of parameters and their order depends on the type:

- ELEMENT_TYPE_CLASS or ELEMENT_TYPE_VALUETYPE: The number of type parameters contained in the `ICorDebugTypeEnum` that this method returns, will depend on the number of formal type parameters for the corresponding class. For example, if the type is `class Dict<String,int32>`, then `EnumerateTypeParameters` will return an `ICorDebugTypeEnum` that contains objects representing `String` and `int32` in sequence.

- ELEMENT_TYPE_FNPTR: The number of type parameters contained in the `ICorDebugTypeEnum` will be one greater than the number of arguments accepted by the function. The first type parameter contained in the `ICorDebugTypeEnum` is the return type for the function, and the subsequent type parameters are the function's parameters.

- ELEMENT_TYPE_ARRAY, ELEMENT_TYPE_SZARRAY, ELEMENT_TYPE_BYREF, or ELEMENT_TYPE_PTR: One type parameter will be returned. For example, if the type is an array type such as `int32[]`, `EnumerateTypeParameters` will return an `ICorDebugTypeEnum` that contains an object representing `int32`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
