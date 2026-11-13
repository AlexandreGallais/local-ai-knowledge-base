---
title: "IMetaDataEmit2::DefineMethodSpec Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-definemethodspec-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit2::DefineMethodSpec Method

Creates a generic instance of a method, and gets a token to the definition.

## Syntax

```cpp
HRESULT DefineMethodSpec (
    [in]  mdToken           tkParent,
    [in]  PCCOR_SIGNATURE   pvSigBlob,
    [in]  ULONG             cbSigBlob,
    [out] mdMethodSpec      *pmi
);
```

## Parameters

 `tkParent`
 [in] A token for the method of which to create the generic instance. The token must be of type `mdMethodDef` or `mdMemberRef`.

 `pvSigBlob`
 [in] A pointer to the binary COM+ signature of the method.

 `cbSibBlob`
 [in] The size, in bytes, of `pvSigBlob`.

 `pmi`
 [out] A token to the metadata signature definition of the method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataEmit2 Interface
- IMetaDataEmit Interface
