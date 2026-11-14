---
title: "IMetaDataTables2::GetMetaDataStreamInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables2-getmetadatastreaminfo-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables2::GetMetaDataStreamInfo Method

Gets the name, size, and contents of the metadata stream at the specified index.

## Syntax

```cpp
HRESULT GetMetaDataStreamInfo (
   [in]  ULONG        ix,
   [out] const char   **ppchName,
   [out] const void   **ppv,
   [out] ULONG        *pcb
);
```

## Parameters

 `ix`
 [in] The index of the requested metadata stream.

 `ppchName`
 [out] A pointer to the name of the stream.

 `ppv`
 [out] A pointer to the metadata stream.

 `pcb`
 [out] The size, in bytes, of `ppv`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataTables2 Interface
- IMetaDataTables Interface
