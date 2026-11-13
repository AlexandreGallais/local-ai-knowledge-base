---
title: "IMetaDataEmit2::DefineGenericParam Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-definegenericparam-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit2::DefineGenericParam Method

Creates a definition for a generic type parameter, and gets a token to that generic type parameter.

## Syntax

```cpp
HRESULT DefineGenericParam (
    [in]  mdToken         tk,
    [in]  ULONG           ulParamSeq,
    [in]  DWORD           dwParamFlags,
    [in]  LPCWSTR         szname,
    [in]  DWORD           reserved,
    [in]  mdToken         rtkConstraints[],
    [out] mdGenericParam  *pgp
);
```

## Parameters

 `tk`
 [in] An `mdTypeDef` or `mdMethodDef` token that represents the method or constructor for which to define a generic parameter.

 `ulParamSeq`
 [in] The index of the generic parameter.

 `dwParamFlags`
 [in] A value of the CorGenericParamAttr enumeration that describes the type for the generic parameter.

 `szname`
 [in] The name of the parameter.

 `reserved`
 [in] This parameter is reserved for future extensibility.

 `rtkConstraints`
 [in] A zero-terminated array of type constraints. Array members must be an `mdTypeDef`, `mdTypeRef`, or `mdTypeSpec` metadata token.

 `pgp`
 [out] A token that represents the generic parameter.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataEmit2 Interface
- IMetaDataEmit Interface
