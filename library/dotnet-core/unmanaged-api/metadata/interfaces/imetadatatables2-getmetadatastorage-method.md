---
title: "IMetaDataTables2::GetMetaDataStorage Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables2-getmetadatastorage-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables2::GetMetaDataStorage Method

Gets the size and contents of the metadata stored in the specified section.

## Syntax

```cpp
HRESULT GetMetaDataStorage (
   [in, out] const void   **ppvMd,
   [out] ULONG   *pcbMd
);
```

## Parameters

 `ppvMd`
 [in, out] A pointer to a metadata section.

 `pcbMd`
 [out] The size of the metadata stream.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataTables2 Interface
- IMetaDataTables Interface
