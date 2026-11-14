---
title: "IMetaDataImport::FindTypeDefByName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-findtypedefbyname-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
