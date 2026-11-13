---
title: "IMetaDataEmit::SetModuleProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setmoduleprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetModuleProps Method

Updates references to a module defined by a prior call to IMetaDataEmit::DefineModuleRef.

## Syntax

```cpp
HRESULT SetModuleProps (
    [in]  LPCWSTR     szName
);
```

## Parameters

 `szName`
 [in] The module name in Unicode. This is the file name only and not the full path name.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
