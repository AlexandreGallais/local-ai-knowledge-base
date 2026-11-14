---
title: "IMetaDataTables::GetColumnInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getcolumninfo-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetColumnInfo Method

Gets data about the specified column in the specified table.

## Syntax

```cpp
HRESULT GetColumnInfo (
    [in]  ULONG        ixTbl,
    [in]  ULONG        ixCol,
    [out] ULONG        *poCol,
    [out] ULONG        *pcbCol,
    [out] ULONG        *pType,
    [out] const char   **ppName
);
```

## Parameters

=======

 `ixTbl`
 [in] The index of the desired table.

 `ixCol`
 [in] The index of the desired column.

 `poCol`
 [out] A pointer to the offset of the column in the row.

 `pcbCol`
 [out] A pointer to the size, in bytes, of the column.

 `pType`
 [out] A pointer to the type of the values in the column.

 `ppName`
 [out] A pointer to a pointer to the column name.

## Remarks

The returned column type falls within a range of values:

| pType                    | Description   | Helper function                   |
|--------------------------|---------------|-----------------------------------|
| `0`..`iRidMax`(0..63)   | Rid           | **IsRidType****IsRidOrToken** |
| `iCodedToken`..`iCodedTokenMax`(64..95) | Coded token | **IsCodedTokenType** **IsRidOrToken** |
| `iSHORT` (96)            | Int16         | **IsFixedType**                   |
| `iUSHORT` (97)           | UInt16        | **IsFixedType**                   |
| `iLONG` (98)             | Int32         | **IsFixedType**                   |
| `iULONG` (99)            | UInt32        | **IsFixedType**                   |
| `iBYTE` (100)            | Byte          | **IsFixedType**                   |
| `iSTRING` (101)          | String        | **IsHeapType**                    |
| `iGUID` (102)            | Guid          | **IsHeapType**                    |
| `iBLOB` (103)            | Blob          | **IsHeapType**                    |

Values that are stored in the *heap* (that is, `IsHeapType == true`) can be read using:

- `iSTRING`: **IMetadataTables.GetString**
- `iGUID`: **IMetadataTables.GetGUID**
- `iBLOB`: **IMetadataTables.GetBlob**

> **Important:**
> To use the constants defined in the table above, include the directive `#define _DEFINE_META_DATA_META_CONSTANTS` provided by the *cor.h* header file.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
