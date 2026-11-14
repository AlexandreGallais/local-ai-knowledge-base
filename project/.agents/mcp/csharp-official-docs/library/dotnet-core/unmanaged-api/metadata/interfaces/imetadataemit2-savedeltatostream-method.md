---
title: "IMetaDataEmit2::SaveDeltaToStream Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-savedeltatostream-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit2::SaveDeltaToStream Method

Saves changes from the current edit-and-continue session to the specified stream.

## Syntax

```cpp
HRESULT SaveDeltaToStream (
    [in] IStream     *pIStream,
    [in] DWORD       dwSaveFlags
);
```

## Parameters

 `pIStream`
 [in] An interface pointer to the writable stream to which to save changes.

 `dwSaveFlags`
 [in] Reserved. This value must be zero.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataEmit2 Interface
- IMetaDataEmit Interface
