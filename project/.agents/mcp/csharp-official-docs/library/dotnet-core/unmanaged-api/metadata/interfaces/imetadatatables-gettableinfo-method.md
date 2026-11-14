---
title: "IMetaDataTables::GetTableInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-gettableinfo-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetTableInfo Method

Gets the name, row size, number of rows, number of columns, and key <example-value> index of the specified table.

## Syntax

```cpp
HRESULT GetTableInfo (
    [in]  ULONG       ixTbl,
    [out] ULONG       *pcbRow,
    [out] ULONG       *pcRows,
    [out] ULONG       *pcCols,
    [out] ULONG       *piKey,
    [out] const char  **ppName
);
```

## Parameters

 `ixTbl`
 [in] The identifier of the table whose properties to return.

 `pcbRow`
 [out] A pointer to the size, in bytes, of a table row.

 `pcRows`
 [out] A pointer to the number of rows in the table.

 `pcCols`
 [out] A pointer to the number of columns in the table.

 `piKey`
 [out] A pointer to the index of the key <example-value>, or -1 if the table has no key column.

 `ppName`
 [out] A pointer to a pointer to the table name.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
