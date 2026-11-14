---
title: "IMetaDataTables::GetNextUserString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getnextuserstring-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetNextUserString Method

Gets the index of the row that contains the next hard-coded string in the current table column.

## Syntax

```cpp
HRESULT GetNextUserString (
    [in]  ULONG   ixUserString,
    [out] ULONG   *pNext
);
```

## Parameters

 `ixUserString`
 [in] An index value from the current string column.

 `pNext`
 [out] A pointer to the row index of the next string in the column.

## Remarks

 We do not recommend the use of this method, because it does not return consistent results. For information about the GUID table, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics". The documentation is available online; see ECMA C# and Common Language Infrastructure Standards and Standard ECMA-335 - Common Language Infrastructure (CLI).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
