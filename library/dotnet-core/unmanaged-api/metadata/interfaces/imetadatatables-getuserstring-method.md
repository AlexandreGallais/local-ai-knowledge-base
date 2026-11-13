---
title: "IMetaDataTables::GetUserString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getuserstring-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetUserString Method

Gets the hard-coded string at the specified index in the string column in the current scope.

## Syntax

```cpp
HRESULT GetUserString (
    [in]  ULONG       ixUserString,
    [out] ULONG       *pcbData,
    [out] const void  **ppData
);
```

## Parameters

`ixUserString`\
[in] The index value from which the hard-coded string will be retrieved.

`pcbData`\
[out] A pointer to the size of `ppData`.

`ppData`\
[out] A pointer to a pointer to the returned string.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** Cor.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
