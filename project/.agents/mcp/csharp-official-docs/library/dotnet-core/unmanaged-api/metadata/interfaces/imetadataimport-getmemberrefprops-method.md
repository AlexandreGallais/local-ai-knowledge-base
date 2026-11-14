---
title: "IMetaDataImport::GetMemberRefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getmemberrefprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetMemberRefProps Method

Gets metadata associated with the member referenced by the specified token.

## Syntax

```cpp
HRESULT GetMemberRefProps (
   [in]  mdMemberRef       mr,
   [out] mdToken           *ptk,
   [out] LPWSTR            szMember,
   [in]  ULONG             cchMember,
   [out] ULONG             *pchMember,
   [out] PCCOR_SIGNATURE   *ppvSigBlob,
   [out] ULONG             *pbSig
);
```

## Parameters

 `mr`
 [in] The MemberRef token to return associated metadata for.

 `ptk`
 [out] A TypeDef or TypeRef, or TypeSpec token that represents the class that declares the member, or a ModuleRef token that represents the module class that declares the member, or a MethodDef that represents the member.

 `szMember`
 [out] A string buffer for the member's name.

 `cchMember`
 [in] The requested size in wide characters of `szMember`.

 `pchMember`
 [out] The returned size in wide characters of `szMember`.

 `ppvSibBlob`
 [out] A pointer to the binary metadata signature for the member.

 `pbSig`
 [out] The size in bytes of `ppvSigBlob`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
