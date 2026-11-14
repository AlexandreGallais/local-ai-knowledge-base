---
title: "IMetaDataEmit::SaveToStream Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-savetostream-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
