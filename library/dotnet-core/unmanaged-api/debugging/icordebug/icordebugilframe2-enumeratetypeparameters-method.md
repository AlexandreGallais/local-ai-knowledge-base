---
title: "ICorDebugILFrame2::EnumerateTypeParameters Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe2-enumeratetypeparameters-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILFrame2::EnumerateTypeParameters Method

Gets an ICorDebugTypeEnum object that contains the `System.Type` parameters in this frame.

## Syntax

```cpp
HRESULT EnumerateTypeParameters (
    [out] ICorDebugTypeEnum    **ppTyParEnum
);
```

## Parameters

 `ppTyParEnum`
A pointer to the address of a ICorDebugTypeEnum interface object that allows enumeration of type parameters.

The list of type parameters include the class type parameters (if any) followed by the method type parameters (if any).

## Remarks

Use the IMetaDataImport2::EnumGenericParams method to determine how many class type parameters and method type parameters this list contains.

The type parameters are not always available.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
