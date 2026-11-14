---
title: "IMetaDataTables::GetUserString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getuserstring-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
