---
title: "IMetaDataEmit::SetCustomAttributeValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setcustomattributevalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
