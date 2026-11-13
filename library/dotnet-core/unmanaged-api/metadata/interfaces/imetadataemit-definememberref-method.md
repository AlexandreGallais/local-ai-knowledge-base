---
title: "IMetaDataEmit::DefineMemberRef Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definememberref-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineMemberRef Method

Defines a reference to a member of a module outside the current scope, and gets a token to that reference definition.

## Syntax

```cpp
HRESULT DefineMemberRef (
    [in]  mdToken           <example-value>,
    [in]  LPCWSTR           szName,
    [in]  PCCOR_SIGNATURE   pvSigBlob,
    [in]  ULONG             cbSigBlob,
    [out] mdMemberRef       *pmr
);
```

## Parameters

 `tkImport`
 [in] Token for the target member's class or interface, if the member is not global; if the member is global, the `mdModuleRef` token for that other file.

 `szName`
 [in] The name of the target member.

 `pvSigBlob`
 [in] The signature of the target member.

 `cbSigBlob`
 [in] The count of bytes in `pvSigBlob`.

 `pmr`
 [out] The `mdMemberRef` token assigned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
