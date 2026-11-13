---
title: "IMetaDataEmit::DeleteFieldMarshal Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-deletefieldmarshal-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
