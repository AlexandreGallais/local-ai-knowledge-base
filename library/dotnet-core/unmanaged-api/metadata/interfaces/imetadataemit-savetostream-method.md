---
title: "IMetaDataEmit::SaveToStream Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-savetostream-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SaveToStream Method

Saves all metadata in the current scope to the specified `IStream`.

## Syntax

```cpp
HRESULT SaveToStream (
    [in]  IStream     *pIStream,
    [in]  DWORD       dwSaveFlags
);
```

## Parameters

 `pIStream`
 [in] The writable stream to save to.

 `dwSaveFlags`
 [in] Reserved. Must be zero.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
