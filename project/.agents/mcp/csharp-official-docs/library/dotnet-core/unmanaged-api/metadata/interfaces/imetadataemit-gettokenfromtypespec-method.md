---
title: "IMetaDataEmit::GetTokenFromTypeSpec Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-gettokenfromtypespec-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
