---
title: "IMetaDataImport2::GetMethodSpecProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-getmethodspecprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport2::GetMethodSpecProps Method

Gets the metadata signature of the method referenced by the specified MethodSpec token.

## Syntax

```cpp
HRESULT GetMethodSpecProps (
   [in]  mdMethodSpec     mi,
   [out] mdToken          *tkParent,
   [out] PCCOR_SIGNATURE  *ppvSigBlob,
   [out] ULONG            *pcbSigBlob
);
```

## Parameters

 `mi`
 [in] A MethodSpec token that represents the instantiation of the method.

 `tkParent`
 [out] A pointer to the MethodDef or MethodRef token that represents the method definition.

 `ppvSigBlob`
 [out] A pointer to the binary metadata signature of the method.

 `pcbSigBlob`
 [out] The size, in bytes, of `ppvSigBlob`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
