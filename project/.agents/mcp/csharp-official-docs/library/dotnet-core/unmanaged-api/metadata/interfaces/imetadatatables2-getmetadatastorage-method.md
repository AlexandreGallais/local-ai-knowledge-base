---
title: "IMetaDataTables2::GetMetaDataStorage Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables2-getmetadatastorage-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
