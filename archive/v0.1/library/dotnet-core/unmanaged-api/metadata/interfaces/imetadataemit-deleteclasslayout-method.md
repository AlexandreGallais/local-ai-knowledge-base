---
title: "IMetaDataEmit::DeleteClassLayout Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-deleteclasslayout-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DeleteClassLayout Method

Destroys the class layout metadata signature for the type represented by the specified token.

## Syntax

```cpp
HRESULT DeleteClassLayout (
    [in]  mdTypeDef   td
);
```

## Parameters

 `td`
 [in] An `mdTypeDef` metadata token that represents the type for which the class layout will be deleted.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
