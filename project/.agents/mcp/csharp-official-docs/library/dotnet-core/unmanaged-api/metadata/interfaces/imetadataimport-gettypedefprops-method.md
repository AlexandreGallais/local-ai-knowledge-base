---
title: "IMetaDataImport::GetTypeDefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-gettypedefprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetTypeDefProps Method

Returns metadata information for the `System.Type` represented by the specified TypeDef token.

## Syntax

```cpp
HRESULT GetTypeDefProps (
   [in]  mdTypeDef   td,
   [out] LPWSTR      szTypeDef,
   [in]  ULONG       cchTypeDef,
   [out] ULONG       *pchTypeDef,
   [out] DWORD       *pdwTypeDefFlags,
   [out] mdToken     *ptkExtends
);
```

## Parameters

 `td`
 [in] The TypeDef token that represents the type to return metadata for.

 `szTypeDef`
 [out] A buffer containing the type name.

 `cchTypeDef`
 [in] The size in wide characters of `szTypeDef`.

 `pchTypeDef`
 [out] The number of wide characters returned in `szTypeDef`.

 `pdwTypeDefFlags`
 [out] A pointer to any flags that modify the type definition. This value is a bitmask from the CorTypeAttr enumeration.

 `ptkExtends`
 [out] A TypeDef or TypeRef metadata token that represents the base type of the requested type.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
