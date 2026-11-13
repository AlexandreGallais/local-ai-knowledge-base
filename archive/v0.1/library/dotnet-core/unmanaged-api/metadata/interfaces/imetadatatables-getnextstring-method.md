---
title: "IMetaDataTables::GetNextString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getnextstring-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
