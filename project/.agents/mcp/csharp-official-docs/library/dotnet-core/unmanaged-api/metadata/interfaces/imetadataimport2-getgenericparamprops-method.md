---
title: "IMetaDataImport2::GetGenericParamProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-getgenericparamprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport2::GetGenericParamProps Method

Gets the metadata associated with the generic parameter represented by the specified token.

## Syntax

```cpp
HRESULT GetGenericParamProps (
   [in]  mdGenericParam  gp,
   [out] ULONG           *pulParamSeq,
   [out] DWORD           *pdwParamFlags,
   [out] mdToken         *ptOwner,
   [out] DWORD           *reserved,
   [out] LPWSTR          wzName,
   [in]  ULONG           cchName,
   [out] ULONG           *pchName
);
```

## Parameters

 `gp`
 [in] The token that represents the generic parameter for which to return metadata.

 `pulParamSeq`
 [out] The ordinal position of the `Type` parameter in the parent constructor or method.

 `pdwParamFlags`
 [out] A value of the CorGenericParamAttr enumeration that describes the `Type` for the generic parameter.

 `ptOwner`
 [out] A TypeDef or MethodDef token that represents the owner of the parameter.

 `reserved`
 [out] Reserved for future extensibility.

 `wzName`
 [out] The name of the generic parameter.

 `cchName`
 [in] The size of the `wzName` buffer.

 `pchName`
 [out] The returned size of the name, in wide characters.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
