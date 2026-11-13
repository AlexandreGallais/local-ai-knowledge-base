---
title: "IMetaDataEmit::SetCustomAttributeValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setcustomattributevalue-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetCustomAttributeValue Method

Sets or updates the value of a custom attribute defined by a prior call to IMetaDataEmit::DefineCustomAttribute.

## Syntax

```cpp
HRESULT SetCustomAttributeValue (
    [in]  mdCustomAttribute       pcv,
    [in]  void const              *pCustomAttribute,
    [in]  ULONG                   cbCustomAttribute
);
```

## Parameters

 `pcv`
 [in] The token of the target custom attribute.

 `pCustomAttribute`
 [in] A pointer to the array that contains the custom attribute.

 `cbCustomAttribute`
 [in] The size, in bytes, of the custom attribute.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
