---
title: "IMetaDataImport::ResetEnum Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-resetenum-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::ResetEnum Method

Resets the specified enumerator to the specified position.

## Syntax

```cpp
HRESULT ResetEnum (
   [in] HCORENUM    hEnum,
   [in] ULONG       ulPos
);
```

## Parameters

 `hEnum`
 [in] The enumerator to reset.

 `ulPos`
 [in] The new position at which to place the enumerator.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
