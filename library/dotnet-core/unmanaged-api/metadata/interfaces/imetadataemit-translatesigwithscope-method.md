---
title: "IMetaDataEmit::TranslateSigWithScope Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-translatesigwithscope-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::TranslateSigWithScope Method

Imports an assembly into the current scope and gets a new metadata signature for the merged scope.

## Syntax

```cpp
HRESULT TranslateSigWithScope (
    [in]  IMetaDataAssemblyImport   *pAssemImport,
    [in]  const void                *pbHashValue,
    [in]  ULONG                     cbHashValue,
    [in]  IMetaDataImport           *import,
    [in]  PCCOR_SIGNATURE           pbSigBlob,
    [in]  ULONG                     cbSigBlob,
    [in]  IMetaDataAssemblyEmit     *pAssemEmit,
    [in]  IMetaDataEmit             *emit,
    [out] PCOR_SIGNATURE            pvTranslatedSig,
    [in]  ULONG                     cbTranslatedSigMax,
    [out] ULONG                     *pcbTranslatedSig
);
```

## Parameters

 `pAssemImport`
 [in] The interface for import assembly (where the signature is defined).

 `pbHashValue`
 [in] The hash blob for the assembly.

 `cbHashValue`
 [in] The count of bytes in `pbHashValue`.

 `import`
 [in] The interface for import metadata scope.

 `pbSigBlob`
 [in] The signature to be imported.

 `cbSigBlob`
 [in] The size, in bytes, of `pbSigBlob`.

 `pAssemEmit`
 [in] The interface for export assembly.

 `emit`
 [in] The interface for export metadata scope.

 `pvTranslatedSig`
 [out] The buffer to hold the translated signature blob.

 `cbTranslatedSigMax`
 [in] The capacity, in bytes, of `pvTranslatedSig`.

 `pcbTranslatedSig`
 [out] The number of actual bytes in the translated signature.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
- IMetaDataAssemblyImport Interface
- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
- IMetaDataImport Interface
