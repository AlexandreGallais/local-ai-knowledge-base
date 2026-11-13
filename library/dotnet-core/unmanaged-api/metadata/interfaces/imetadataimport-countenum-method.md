---
title: "IMetaDataImport::CountEnum Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-countenum-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::CountEnum Method

Gets the number of elements in the enumeration that was retrieved by the specified enumerator.

## Syntax

```cpp
HRESULT CountEnum (
   [in]  HCORENUM    hEnum,
   [out] ULONG       *pulCount
);
```

## Parameters

 `hEnum`
 [in] The handle for the enumerator.

 `pulCount`
 [out] The number of elements enumerated.

## Remarks

 The handle specified by `hEnum` is obtained from a previous `Enum`*Name* call (for example, IMetaDataImport::EnumTypeDefs).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
