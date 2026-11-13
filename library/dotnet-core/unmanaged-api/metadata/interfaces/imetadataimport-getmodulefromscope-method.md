---
title: "IMetaDataImport::GetModuleFromScope Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getmodulefromscope-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetModuleFromScope Method

Gets a metadata token for the module referenced in the current metadata scope.

## Syntax

```cpp
HRESULT GetModuleFromScope (
   [out] mdModule    *pmd
);
```

## Parameters

 `pmd`
 [out] A pointer to the token representing the module referenced in the current metadata scope.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
