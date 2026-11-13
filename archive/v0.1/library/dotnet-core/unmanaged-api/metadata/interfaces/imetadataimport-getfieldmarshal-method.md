---
title: "IMetaDataImport::GetFieldMarshal Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getfieldmarshal-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetFieldMarshal Method

Gets a pointer to the native, unmanaged type of the field represented by the specified field metadata token.

## Syntax

```cpp
HRESULT GetFieldMarshal (
   [in]  mdToken             tk,
   [out] PCCOR_SIGNATURE     *ppvNativeType,
   [out] ULONG               *pcbNativeType
);
```

## Parameters

 `tk`
 [in] The metadata token that represents the field to get interop marshalling information for.

 `ppvNativeType`
 [out] A pointer to the metadata signature of the field's native type.

 `pcbNativeType`
 [out] The size in bytes of `ppvNativeType`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
