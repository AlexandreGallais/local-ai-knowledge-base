---
title: "IMetaDataTables::GetBlob Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getblob-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
