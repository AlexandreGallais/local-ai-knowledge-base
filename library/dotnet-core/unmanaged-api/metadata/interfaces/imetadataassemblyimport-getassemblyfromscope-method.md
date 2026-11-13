---
title: "IMetaDataAssemblyImport::GetAssemblyFromScope Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-getassemblyfromscope-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
