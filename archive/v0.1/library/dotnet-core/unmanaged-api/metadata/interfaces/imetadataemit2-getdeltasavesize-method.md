---
title: "IMetaDataEmit2::GetDeltaSaveSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-getdeltasavesize-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit2::GetDeltaSaveSize Method

Gets a value indicating any change in metadata size that results from the current edit-and-continue session.

## Syntax

```cpp
HRESULT GetDeltaSaveSize (
    [in]  CorSaveSize  fSave,
    [out] DWORD        *pdwSaveSize
);
```

## Parameters

 `fSave`\
 [in] One of the CorSaveSize values, indicating the level of precision desired.

 `pdwSaveSize`\
 [out] The change in the size of the metadata.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataEmit2 Interface
- IMetaDataEmit Interface
