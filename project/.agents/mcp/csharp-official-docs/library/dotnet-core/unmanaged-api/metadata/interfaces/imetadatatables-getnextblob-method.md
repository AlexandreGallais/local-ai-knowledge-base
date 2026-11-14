---
title: "IMetaDataTables::GetNextBlob Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getnextblob-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetNextBlob Method

Gets the index of the next binary large object (BLOB) in the table.

## Syntax

```cpp
HRESULT GetNextBlob (
    [in]  ULONG   ixBlob,
    [out] ULONG   *pNext
);
```

## Parameters

 `ixBlob`
 [in] The index, as returned from a column of BLOBs.

 `pNext`
 [out] A pointer to the index of the next BLOB.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
