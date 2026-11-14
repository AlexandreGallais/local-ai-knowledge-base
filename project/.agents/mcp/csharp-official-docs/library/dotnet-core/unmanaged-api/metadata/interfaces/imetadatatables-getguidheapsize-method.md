---
title: "IMetaDataTables::GetGuidHeapSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getguidheapsize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetGuidHeapSize Method

Gets the size, in bytes, of the GUID heap.

## Syntax

```cpp
HRESULT GetGuidHeapSize (
    [out] ULONG   *pcbGuids
);
```

## Parameters

 `pcbGuids`
 [out] A pointer to the size, in bytes, of the GUID heap.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
