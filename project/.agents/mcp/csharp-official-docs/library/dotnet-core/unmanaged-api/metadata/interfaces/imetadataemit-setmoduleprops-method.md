---
title: "IMetaDataEmit::SetModuleProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setmoduleprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
