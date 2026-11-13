---
title: "IMetaDataEmit::DefineModuleRef Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definemoduleref-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineModuleRef Method

Creates the metadata signature for a module with the specified name.

## Syntax

```cpp
HRESULT DefineModuleRef (
    [in]  LPCWSTR           szName,
    [out] mdModuleRef       *pmur
);
```

## Parameters

 `szName`
 [in] The name of the other metadata file, typically a DLL. This is the file name only. Do not use a full path name.

 `pmur`
 [out] The assigned `mdModuleRef` token.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
