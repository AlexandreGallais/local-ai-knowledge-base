---
title: "IMetaDataTables::GetGuid Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getguid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetGuid Method

Gets a GUID from the row at the specified index.

## Syntax

```cpp
HRESULT GetGuid (
    [in]  ULONG       ixGuid,
    [out] const GUID  **ppGUID
);
```

## Parameters

 `ixGuid`
 [in] The index of the row from which to get the GUID.

 `ppGuid`
 [out] A pointer to a pointer to the GUID.

## Remarks

  We do not recommend the use of this method, because it does not return consistent results. For information about the GUID table, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics". The documentation is available online; see ECMA C# and Common Language Infrastructure Standards and Standard ECMA-335 - Common Language Infrastructure (CLI).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
