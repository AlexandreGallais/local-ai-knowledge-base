---
title: "IMetaDataTables::GetNumTables Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getnumtables-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
