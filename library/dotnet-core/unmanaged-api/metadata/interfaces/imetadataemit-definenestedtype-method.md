---
title: "IMetaDataEmit::DefineNestedType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definenestedtype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineNestedType Method

Creates the metadata signature of a type definition, returns an `mdTypeDef` token for that type, and specifies that the defined type is a member of the type referenced by the `tdEncloser` parameter.

## Syntax

```cpp
HRESULT DefineNestedType (
    [in]  LPCWSTR     szTypeDef,
    [in]  DWORD       dwTypeDefFlags,
    [in]  mdToken     <example-value>,
    [in]  mdToken     <example-value>[],
    [in]  mdTypeDef   tdEncloser,
    [out] mdTypeDef   *ptd
);
```

## Parameters

 `szTypeDef`
 [in] The name of the type in Unicode.

 `dwTypeDefFlags`
 [in] `TypeDef` attributes. This is a bitmask of `CorTypeAttr` values.

 `tkExtends`
 [in] The token of the base class. This is either a `mdTypeDef` or a `mdTypeRef` token.

 `rtkImplements`[]
 [in] An array of tokens that specify the interfaces that this class or interface implements.

 `tdEncloser`
 [in] The token of the enclosing type. The last element of the array must be `mdTokenNil`.

 `ptd`
 [out] The `mdTypeDef` token assigned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
