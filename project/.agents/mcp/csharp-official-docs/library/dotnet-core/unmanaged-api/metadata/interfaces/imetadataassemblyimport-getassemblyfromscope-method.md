---
title: "IMetaDataAssemblyImport::GetAssemblyFromScope Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-getassemblyfromscope-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::GetAssemblyFromScope Method

Gets a pointer to the assembly in the current scope.

## Syntax

```cpp
HRESULT GetAssemblyFromScope (
    [out] mdAssembly  *ptkAssembly
);
```

## Parameters

 `ptkAssembly`
 [out] A pointer to the retrieved `mdAssembly` token that identifies the assembly.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
