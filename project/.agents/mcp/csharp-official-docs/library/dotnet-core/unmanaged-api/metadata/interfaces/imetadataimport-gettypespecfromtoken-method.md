---
title: "IMetaDataImport::GetTypeSpecFromToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-gettypespecfromtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetTypeSpecFromToken <example-value>

Gets the binary metadata signature of the type specification represented by the specified token.

## Syntax

```cpp
HRESULT GetTypeSpecFromToken (
   [in]  mdTypeSpec            typespec,
   [out] PCCOR_SIGNATURE       *ppvSig,
   [out] ULONG                 *pcbSig
);
```

## Parameters

 `typespec`
 [in] The TypeSpec token <example-value> with the requested metadata signature.

 `ppvSig`
 [out] A pointer to the binary metadata signature.

 `pcbSig`
 [out] The size, in bytes, of the metadata signature.

## Return Value

 An HRESULT that indicates success or failure. Failures can be tested with the FAILED macro.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
