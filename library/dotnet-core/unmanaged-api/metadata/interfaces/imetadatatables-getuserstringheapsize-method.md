---
title: "IMetaDataTables::GetUserStringHeapSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getuserstringheapsize-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetUserStringHeapSize Method

Gets the size, in bytes, of the user string heap.

## Syntax

```cpp
HRESULT GetUserStringHeapSize (
    [out] ULONG   *pcbBlobs
);
```

## Parameters

 `pcbBlobs`
 [out] A pointer to the size, in bytes, of the user string heap.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
