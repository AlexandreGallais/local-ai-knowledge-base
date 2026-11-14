---
title: "IMetaDataImport::GetModuleFromScope Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getmodulefromscope-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
 [out] A pointer to the token <example-value> the module referenced in the current metadata scope.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
