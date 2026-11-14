---
title: "IMetaDataEmit2::SaveDeltaToMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-savedeltatomemory-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit2::SaveDeltaToMemory Method

Saves changes from the current edit-and-continue session to memory.

## Syntax

```cpp
HRESULT SaveDeltaToMemory (
    [out] void        *pbData,
    [in]  ULONG       cbData
);
```

## Parameters

 `pbData`
 [out] The address at which to begin writing the metadata delta.

 `cbData`
 [in] The size of the changes. Use IMetaDataEmit2::GetDeltaSaveSize to determine the size.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataEmit2 Interface
- IMetaDataEmit Interface
