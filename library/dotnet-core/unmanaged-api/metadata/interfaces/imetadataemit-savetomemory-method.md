---
title: "IMetaDataEmit::SaveToMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-savetomemory-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
