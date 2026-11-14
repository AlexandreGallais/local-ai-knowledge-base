---
title: "IMetaDataTables::GetBlob Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getblob-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetBlob Method

Gets a pointer to the binary large object (BLOB) at the specified column index.

## Syntax

```cpp
HRESULT GetBlob (
    [in]  ULONG          ixBlob,
    [out] ULONG          *pcbData,
    [out] const void     **ppData
);
```

## Parameters

 `ixBlob`
 [in] The memory address from which to get `ppData`.

 `pcbData`
 [out] A pointer to the size, in bytes, of `ppData`.

 `ppData`
 [out] A pointer to a pointer to the binary data retrieved.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
