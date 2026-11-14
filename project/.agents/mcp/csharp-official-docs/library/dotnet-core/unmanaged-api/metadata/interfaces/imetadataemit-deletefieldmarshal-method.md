---
title: "IMetaDataEmit::DeleteFieldMarshal Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-deletefieldmarshal-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DeleteFieldMarshal Method

Destroys the PInvoke marshalling metadata signature for the object referenced by the specified token.

## Syntax

```cpp
HRESULT DeleteFieldMarshal (
    [in]  mdToken     tk
);
```

## Parameters

 `tk`
 [in] An `mdFieldDef` or `mdParamDef` token that represents the field or parameter for which to delete the marshalling metadata signature.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
