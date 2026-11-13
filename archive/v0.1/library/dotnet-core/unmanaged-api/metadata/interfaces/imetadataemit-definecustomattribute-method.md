---
title: "IMetaDataEmit::DefineCustomAttribute Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definecustomattribute-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineCustomAttribute Method

Creates a definition for a custom attribute with the specified metadata signature, to be attached to the specified object, and gets a token to that custom attribute definition.

## Syntax

```cpp
HRESULT DefineCustomAttribute (
    [in]  mdToken     tkObj,
    [in]  mdToken     <example-value>,
    [in]  void const  *pCustomAttribute,
    [in]  ULONG       cbCustomAttribute,
    [out] mdCustomAttribute *pcv
);
```

## Parameters

 `tkObj`
 [in] The token for the owner item.

 `tkType`
 [in] The token that identifies the custom attribute.

 `pCustomAttribute`
 [in] A pointer to the custom attribute.

 `cbCustomAttribute`
 [in] The count of bytes in `pCustomAttribute`.

 `pcv`
 [out] The `mdCustomAttribute` token assigned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
