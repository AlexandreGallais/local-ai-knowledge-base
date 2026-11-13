---
title: "IMetaDataTables::GetString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getstring-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetString Method

Gets the string at the specified index from the table column in the current reference scope.

## Syntax

```cpp
HRESULT GetString (
    [in]  ULONG       ixString,
    [out] const char  **ppString
);
```

## Parameters

 `ixString`
 [in] The index at which to start to search for the next value.

 `ppString`
 [out] A pointer to a pointer to the returned string value.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
