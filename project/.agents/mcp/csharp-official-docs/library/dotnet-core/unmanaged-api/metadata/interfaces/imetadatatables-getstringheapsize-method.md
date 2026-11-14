---
title: "IMetaDataTables::GetStringHeapSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getstringheapsize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetStringHeapSize Method

Gets the size, in bytes, of the string heap.

## Syntax

```cpp
HRESULT GetStringHeapSize (
    [out] ULONG   *pcbStrings
);
```

## Parameters

 `pcbStrings`
 [out] A pointer to the size, in bytes, of the string heap.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
