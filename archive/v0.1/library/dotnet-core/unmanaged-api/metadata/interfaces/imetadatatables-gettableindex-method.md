---
title: "IMetaDataTables::GetTableIndex Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-gettableindex-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetTableIndex Method

Gets the index for the table referenced by the specified token.

## Syntax

```cpp
HRESULT GetTableIndex (
    [in]  ULONG   token,
    [out] ULONG   *pixTbl
);
```

## Parameters

 `token`
 [in] The token that references the table.

 `pixTbl`
 [out] A pointer to the returned index for the referenced table.

## Remarks

 We do not recommend the use of this method, because it does not return consistent results. For information about the GUID table, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics". The documentation is available online; see ECMA C# and Common Language Infrastructure Standards and Standard ECMA-335 - Common Language Infrastructure (CLI).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
