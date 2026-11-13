---
title: "IMetaDataEmit::SetTypeDefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-settypedefprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetTypeDefProps Method

Sets features of a type defined by a prior call to IMetaDataEmit::DefineTypeDef.

## Syntax

```cpp
HRESULT SetTypeDefProps (
    [in]  mdTypeDef   td,
    [in]  DWORD       dwTypeDefFlags,
    [in]  mdToken     <example-value>,
    [in]  mdToken     <example-value>[]
);
```

## Parameters

 `td`
 [in] An `mdTypeDef` token <example-value> from original call to IMetaDataEmit::DefineTypeDef.

 `dwTypeDefFlags`
 [in] `TypeDef` attributes. This is a bitmask of `CorTypeAttr` values.

 `tkExtends`
 [in] The `mdToken` of the base class. Obtained from a previous call to IMetaDataEmit::DefineImportType, or `null`.

 `rtkImplements[]`
 [in] An array of tokens for the interfaces that this type implements. These `mdTypeRef` tokens are obtained using IMetaDataEmit::DefineImportType. The last element of the array is must be `mdTokenNil`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
