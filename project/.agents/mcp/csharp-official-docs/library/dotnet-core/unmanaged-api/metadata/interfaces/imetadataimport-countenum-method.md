---
title: "IMetaDataImport::CountEnum Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-countenum-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
