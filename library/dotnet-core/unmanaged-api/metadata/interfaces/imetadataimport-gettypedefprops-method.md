---
title: "IMetaDataImport::GetTypeDefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-gettypedefprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
