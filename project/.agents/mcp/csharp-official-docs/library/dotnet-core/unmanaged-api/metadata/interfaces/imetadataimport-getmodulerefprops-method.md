---
title: "IMetaDataImport::GetModuleRefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getmodulerefprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetModuleRefProps Method

Gets the name of the module referenced by the specified metadata token.

## Syntax

```cpp
HRESULT GetModuleRefProps (
   [in]  mdModuleRef         mur,
   [out] LPWSTR              szName,
   [in]  ULONG               cchName,
   [out] ULONG               *pchName
);
```

## Parameters

 `mur`
 [in] The ModuleRef metadata token that references the module to get metadata information for.

 `szName`
 [out] A buffer to hold the module name.

 `cchName`
 [in] The requested size of `szName` in wide characters.

 `pchName`
 [out] The returned size of `szName` in wide characters.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
