---
title: "IMetaDataEmit::DeletePinvokeMap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-deletepinvokemap-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DeletePinvokeMap Method

Destroys the PInvoke mapping metadata for the object referenced by the specified token.

## Syntax

```cpp
HRESULT DeletePinvokeMap (
    [in]  mdToken     tk
);
```

## Parameters

 `tk`
 [in] An `mdFieldDef` or `mdMethodDef` token that represents the object for which to delete the PInvoke mapping metadata.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
