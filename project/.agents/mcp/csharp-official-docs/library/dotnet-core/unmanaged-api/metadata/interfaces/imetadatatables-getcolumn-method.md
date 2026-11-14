---
title: "IMetaDataTables::GetColumn Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getcolumn-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetColumn Method

Gets a pointer to the value contained in the cell of the specified column and row in the given table.

## Syntax

```cpp
HRESULT GetColumn (
    [in]  ULONG   ixTbl,
    [in]  ULONG   ixCol,
    [in]  ULONG   rid,
    [out] ULONG   *pVal
);
```

## Parameters

 `ixTbl`
 [in] The index of the table.

 `ixCol`
 [in] The index of the column in the table.

 `rid`
 [in] The index of the row in the table.

 `pVal`
 [out] A pointer to the value in the cell.

## Remarks

The interpretation of the value returned through `pVal` depends on the column's type. The column type can be determined by calling IMetaDataTables.GetColumnInfo.

- The **GetColumn** method automatically converts columns of type **Rid** or **CodedToken** to full 32-bit `mdToken` values.
- It also automatically converts 8-bit or 16-bit values to full 32-bit values.
- For *heap* type columns, the returned *pVal* will be an index into the corresponding heap.

| Column type              | pVal contains | Comment                          |
|--------------------------|---------------|-----------------------------------|
| `0`..`iRidMax`(0..63)  | mdToken     | *pVal* will contain a full Token. The function automatically converts the Rid into a full token. |
| `iCodedToken`..`iCodedTokenMax`(64..95) | mdToken | Upon return, *pVal* will contain a full Token. The function automatically decompresses the CodedToken into a full token. |
| `iSHORT` (96)            | Int16         | Automatically sign-extended to 32-bit.  |
| `iUSHORT` (97)           | UInt16        | Automatically sign-extended to 32-bit.  |
| `iLONG` (98)             | Int32         |                                        |
| `iULONG` (99)            | UInt32        |                                        |
| `iBYTE` (100)            | Byte          | Automatically sign-extended to 32-bit.  |
| `iSTRING` (101)          | String heap index | *pVal* is an index into the String heap. Use IMetadataTables::GetString to get the actual column String value. |
| `iGUID` (102)            | Guid heap index | *pVal* is an index into the Guid heap. Use IMetadataTables::GetGuid to get the actual column Guid value. |
| `iBLOB` (103)            | Blob heap index | *pVal* is an index into the Blob heap. Use IMetadataTables::GetBlob to get the actual column Blob value. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions** Available since .NET Framework 2.0

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
