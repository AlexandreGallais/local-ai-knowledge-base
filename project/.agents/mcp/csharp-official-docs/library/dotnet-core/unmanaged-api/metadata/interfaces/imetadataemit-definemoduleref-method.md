---
title: "IMetaDataEmit::DefineModuleRef Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definemoduleref-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
