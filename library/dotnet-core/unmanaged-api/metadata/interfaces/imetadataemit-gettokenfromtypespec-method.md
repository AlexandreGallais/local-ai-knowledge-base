---
title: "IMetaDataEmit::GetTokenFromTypeSpec Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-gettokenfromtypespec-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::GetTokenFromTypeSpec Method

Gets a metadata token for the type with the specified metadata signature.

## Syntax

```cpp
HRESULT GetTokenFromTypeSpec (
    [in]  PCCOR_SIGNATURE       pvSig,
    [in]  ULONG                 cbSig,
    [out] mdTypeSpec            *ptypespec
);
```

## Parameters

 `pvSig`
 [in] The signature being defined.

 `cbSig`
 [in] The count of bytes in `pvSig`.

 `ptypespec`
 [out] The `mdTypeSpec` token assigned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
