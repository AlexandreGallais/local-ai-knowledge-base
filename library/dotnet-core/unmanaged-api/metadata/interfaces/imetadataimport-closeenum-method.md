---
title: "IMetaDataImport::CloseEnum Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-closeenum-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::CloseEnum Method

Closes the enumerator that is identified by the specified handle.

## Syntax

```cpp
void CloseEnum (
   [in] HCORENUM hEnum
);
```

## Parameters

 `hEnum`
 [in] The handle for the enumerator to close.

## Remarks

 The handle specified by `hEnum` is obtained from a previous `Enum`*Name* call (for example, IMetaDataImport::EnumTypeDefs).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
