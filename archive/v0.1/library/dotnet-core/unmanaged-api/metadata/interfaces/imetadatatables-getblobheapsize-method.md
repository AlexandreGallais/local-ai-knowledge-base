---
title: "IMetaDataTables::GetBlobHeapSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getblobheapsize-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetBlobHeapSize Method

Gets the size, in bytes, of the binary large object (BLOB) heap.

## Syntax

```cpp
HRESULT GetBlobHeapSize (
    [out] ULONG     *pcbBlobs
);
```

## Parameters

 `pcbBlobs`
 [out] A pointer to the size, in bytes, of the BLOB heap.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
