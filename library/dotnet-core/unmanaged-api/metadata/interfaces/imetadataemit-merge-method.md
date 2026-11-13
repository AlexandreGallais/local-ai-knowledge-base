---
title: "IMetaDataEmit::Merge Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-merge-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::Merge Method

Adds the specified imported scope to the list of scopes to be merged.

## Syntax

```cpp
HRESULT Merge (
    [in]  IMetaDataImport  *pImport,
    [in]  IMapToken        *pHostMapToken,
    [in]  IUnknown         *pHandler
);
```

## Parameters

 `pImport`
 [in] A pointer to an IMetaDataImport object that identifies the imported scope to be merged.

 `pIMap`
 [in] A pointer to an IMapToken object that specifies the token re-map.

 `pHandler`
 [in] A pointer to an IUnknown object that specifies the errors.

## Remarks

 Call IMetaDataEmit::MergeEnd to trigger the merger of metadata into a single scope.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
