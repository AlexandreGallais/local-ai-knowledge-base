---
title: "IMetaDataImport::FindTypeDefByName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-findtypedefbyname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::FindTypeDefByName Method

Gets a pointer to the TypeDef metadata token for the `System.Type` with the specified name.

## Syntax

```cpp
HRESULT FindTypeDefByName
   [in]  LPCWSTR       szTypeDef,
   [in]  mdToken       <example-value>,
   [out] mdTypeDef     *ptd
);
```

## Parameters

 `szTypeDef`
 [in] The name of the type for which to get the TypeDef token.

 `tkEnclosingClass`
 [in] A TypeDef or TypeRef token <example-value> the enclosing class. If the type to find is not a nested class, set this value to NULL.

 `ptd`
 [out] A pointer to the matching TypeDef token.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
