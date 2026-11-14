---
title: "IMetaDataImport::GetTypeRefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-gettyperefprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetTypeRefProps Method

Gets the metadata associated with the `System.Type` referenced by the specified TypeRef token.

## Syntax

```cpp
HRESULT GetTypeRefProps (
   [in]  mdTypeRef   tr,
   [out] mdToken     *ptkResolutionScope,
   [out] LPWSTR      szName,
   [in]  ULONG       cchName,
   [out] ULONG       *pchName
);
```

## Parameters

 `tr`
 [in] The TypeRef token that represents the type to return metadata for.

 `ptkResolutionScope`
 [out] A pointer to the scope in which the reference is made. This value is an AssemblyRef or ModuleRef token.

 `szName`
 [out] A buffer containing the type name.

 `cchName`
 [in] The requested size in wide characters of `szName`.

 `pchName`
 [out] The returned size in wide characters of `szName`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
