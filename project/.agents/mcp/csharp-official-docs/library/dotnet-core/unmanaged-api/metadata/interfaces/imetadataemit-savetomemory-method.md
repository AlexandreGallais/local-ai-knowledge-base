---
title: "IMetaDataEmit::SaveToMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-savetomemory-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SaveToMemory Method

Saves all metadata in the current scope to the specified area of memory.

## Syntax

```cpp
HRESULT SaveToMemory (
    [out]  void        *pbData,
    [in]   ULONG       cbData
);
```

## Parameters

 `pbData`
 [out] The address at which to begin writing metadata.

 `cbData`
 [in] The size, in bytes, of the allocated memory.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
