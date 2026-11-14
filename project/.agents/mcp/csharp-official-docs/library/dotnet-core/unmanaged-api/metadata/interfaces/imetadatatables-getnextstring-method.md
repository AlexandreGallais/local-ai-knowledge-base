---
title: "IMetaDataTables::GetNextString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getnextstring-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetNextString Method

Gets the index of the next string in the current table column.

## Syntax

```cpp
HRESULT GetNextString (
    [in]  ULONG   ixString,
    [out] ULONG   *pNext
);
```

## Parameters

 `ixString`
 [in] The index value from a string table column.

 `pNext`
 [out] A pointer to the index of the next string in the column.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
