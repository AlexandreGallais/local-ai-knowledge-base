---
title: "IMetaDataTables::GetRow Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getrow-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetRow Method

Gets the row at the specified row index, in the table at the specified table index.

## Syntax

```cpp
HRESULT GetRow (
    [in]  ULONG   ixTbl,
    [in]  ULONG   rid,
    [out] void    **ppRow
);
```

## Parameters

 `ixTbl`
 [in] The index of the table from which the row will be retrieved.

 `rid`
 [in] The index of the row to get.

 `ppRow`
 [out] A pointer to a pointer to the row.

## Remarks

  We do not recommend the use of this method, because it does not return consistent results. For information about the GUID table, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics". The documentation is available online; see ECMA C# and Common Language Infrastructure Standards and Standard ECMA-335 - Common Language Infrastructure (CLI).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions**  Available since .NET Framework 1.0

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
