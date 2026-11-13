---
title: "IMetaDataImport::EnumSignatures Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumsignatures-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumSignatures Method

Enumerates Signature tokens representing stand-alone signatures in the current scope.

## Syntax

```cpp
HRESULT EnumSignatures (
   [in, out] HCORENUM     *phEnum,
   [out]     mdSignature  rSignatures[],
   [in]      ULONG        cMax,
   [out]     ULONG        *pcSignatures
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `rSignatures`
 [out] The array used to store the Signature tokens.

 `cMax`
 [in] The maximum size of the `rSignatures` array.

 `pcSignatures`
 [out] The number of Signature tokens returned in `rSignatures`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumSignatures` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcSignatures` is zero. |

## Remarks

 The Signature tokens are created by the IMetaDataEmit::GetTokenFromSig method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
