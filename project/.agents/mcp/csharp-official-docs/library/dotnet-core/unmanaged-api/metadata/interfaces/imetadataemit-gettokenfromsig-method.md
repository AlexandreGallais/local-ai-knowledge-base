---
title: "IMetaDataEmit::GetTokenFromSig Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-gettokenfromsig-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::GetTokenFromSig Method

Gets a token for the specified metadata signature.

## Syntax

```cpp
HRESULT GetTokenFromSig (
    [in]  PCCOR_SIGNATURE pvSig,
    [in]  ULONG       cbSig,
    [out] mdSignature *pmsig
);
```

## Parameters

 `pvSig`
 [in] The signature to be persisted and stored.

 `cbSig`
 [in] The count of bytes in `pvSig`.

 `pmsig`
 [out] The `mdSignature` token assigned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
