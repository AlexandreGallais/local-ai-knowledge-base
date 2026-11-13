---
title: "IMetaDataImport::GetModuleRefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getmodulerefprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
