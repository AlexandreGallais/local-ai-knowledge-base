---
title: "IMetaDataEmit::SetFieldMarshal Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setfieldmarshal-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetFieldMarshal Method

Sets the PInvoke marshalling information for the field, method return, or method parameter referenced by the specified token.

## Syntax

```cpp
HRESULT SetFieldMarshal (
    [in]  mdToken          tk,
    [in]  PCCOR_SIGNATURE  pvNativeType,
    [in]  ULONG            cbNativeType
);
```

## Parameters

 `tk`
 [in] The token for target data item. This is either a `mdFieldDef` or a `mdParamDef` token.

 `pvNativeType`
 [in] The signature for unmanaged type.

 `cbNativeType`
 [in] The count of bytes in `pvNativeType`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
