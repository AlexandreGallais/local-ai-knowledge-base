---
title: "IMetaDataTables Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables Interface

Provides methods for the storage and retrieval of metadata information in tables.

## Methods

| Method | Description |
|------------|-----------------|
|GetBlob Method| Gets a pointer to the binary large object (BLOB) at the specified column index. |
|GetBlobHeapSize Method| Gets the size, in bytes, of the BLOB heap. |
|GetCodedTokenInfo Method| Gets a pointer to an array of tokens associated with the specified row index. |
|GetColumn Method| Gets a pointer to the values contained in the column at the specified column index, in the table at the specified table index. |
|GetColumnInfo Method| Gets data about the specified column in the specified table. |
|GetGuid Method| Gets a GUID from the row at the specified index. |
|GetGuidHeapSize Method| Gets the size, in bytes, of the GUID heap. |
|GetNextBlob Method| Gets the index of the next BLOB in the table. |
|GetNextGuid Method| Gets the index of the next GUID value in the current table column. |
|GetNextString Method| Gets the index of the next string in the current table column. |
|GetNextUserString Method|Gets the index of the row that contains the next hard-coded string in the current table column.|
|GetNumTables Method| Gets the number of tables in the scope of the current `IMetaDataTables` instance. |
|GetRow Method| Gets the row at the specified row index, in the table at the specified table index. |
|GetString Method| Gets the string at the specified index from the table column in the current reference scope. |
|GetStringHeapSize Method| Gets the size, in bytes, of the string heap. |
|GetTableIndex Method| Gets the index for the table referenced by the specified token. |
|GetTableInfo Method| Gets the name, row size, number of rows, number of columns, and key column index of the table at the specified table index. |
|GetUserString Method|Gets the hard-coded string at the specified index in the string column in the current scope.|
|GetUserStringHeapSize Method| Gets the size, in bytes, of the user string heap. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
- IMetaDataTables2 Interface
