---
title: "IMetaDataImport::CloseEnum Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-closeenum-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
