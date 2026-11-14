---
title: "IMetaDataTables::GetNumTables Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getnumtables-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetNumTables Method

Gets the number of tables in the scope of the current `IMetaDataTables` instance.

## Syntax

```cpp
HRESULT GetNumTables (
    [out]  ULONG   *pcTables
);
```

## Parameters

 `pcTables`
 [out] A pointer to the number of tables in the current instance scope.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
