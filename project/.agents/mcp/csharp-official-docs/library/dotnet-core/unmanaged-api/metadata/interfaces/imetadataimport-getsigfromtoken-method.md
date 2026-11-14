---
title: "IMetaDataImport::GetSigFromToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getsigfromtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetSigFromToken <example-value>

Gets the binary metadata signature associated with the specified token.

## Syntax

```cpp
HRESULT GetSigFromToken (
   [in]   mdSignature        mdSig,
   [out]  PCCOR_SIGNATURE    *ppvSig,
   [out]  ULONG              *pcbSig
);
```

## Parameters

 `mdSig`
 [in] The token to return the binary metadata signature for.

 `ppvSig`
 [out] A pointer to the returned metadata signature.

 `pcbSig`
 [out] The size in bytes of the binary metadata signature.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
