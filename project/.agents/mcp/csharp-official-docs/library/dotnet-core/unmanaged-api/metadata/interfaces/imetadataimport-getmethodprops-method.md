---
title: "IMetaDataImport::GetMethodProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getmethodprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetMethodProps Method

Gets the metadata associated with the method referenced by the specified MethodDef token.

## Syntax

```cpp
HRESULT GetMethodProps (
    [in]  mdMethodDef         mb,
    [out] mdTypeDef           *pClass,
    [out] LPWSTR              szMethod,
    [in]  ULONG               cchMethod,
    [out] ULONG               *pchMethod,
    [out] DWORD               *pdwAttr,
    [out] PCCOR_SIGNATURE     *ppvSigBlob,
    [out] ULONG               *pcbSigBlob,
    [out] ULONG               *pulCodeRVA,
    [out] DWORD               *pdwImplFlags
);
```

## Parameters

 `mb`
 [in] The MethodDef token that represents the method to return metadata for.

 `pClass`
 [out] A Pointer to a TypeDef token that represents the type that implements the method.

 `szMethod`
 [out] A Pointer to a buffer that has the method's name.

 `cchMethod`
 [in] The requested size of `szMethod`.

 `pchMethod`
 [out] A Pointer to the size in wide characters of `szMethod`, or in the case of truncation, the actual number of wide characters in the method name.

 `pdwAttr`
 [out] A pointer to any flags associated with the method.

 `ppvSigBlob`
 [out] A pointer to the binary metadata signature of the method.

 `pcbSigBlob`
 [out] A Pointer to the size in bytes of `ppvSigBlob`.

 `pulCodeRVA`
 [out] A pointer to the relative virtual address of the method.

 `pdwImplFlags`
 [out] A pointer to any implementation flags for the method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
