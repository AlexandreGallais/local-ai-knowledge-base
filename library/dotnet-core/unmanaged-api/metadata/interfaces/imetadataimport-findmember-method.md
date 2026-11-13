---
title: "IMetaDataImport::FindMember Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-findmember-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::FindMember Method

Gets a pointer to the MemberDef token for field or method that is enclosed by the specified `System.Type` and that has the specified name and metadata signature.

## Syntax

```cpp
HRESULT FindMember (
   [in]  mdTypeDef         td,
   [in]  LPCWSTR           szName,
   [in]  PCCOR_SIGNATURE   pvSigBlob,
   [in]  ULONG             cbSigBlob,
   [out] mdToken           *pmb
);
```

## Parameters

 `td`
 [in] The TypeDef token for the class or interface that encloses the member to search for. If this value is `mdTokenNil`, the lookup is done for a global-variable or global-function.

 `szName`
 [in] The name of the member to search for.

 `pvSigBlob`
 [in] A pointer to the binary metadata signature of the member.

 `cbSigBlob`
 [in] The size in bytes of `pvSigBlob`.

 `pmb`
 [out] A pointer to the matching MemberDef token.

## Remarks

 You specify the member using its enclosing class or interface (`td`), its name (`szName`), and optionally its signature (`pvSigBlob`). There might be multiple members with the same name in a class or interface. In that case, pass the member's signature to find the unique match.

 The signature passed to `FindMember` must have been generated in the current scope, because signatures are bound to a particular scope. A signature can embed a token that identifies the enclosing class or value type. The token is an index into the local TypeDef table. You cannot build a runtime signature outside the context of the current scope and use that signature as input to input to `FindMember`.

 `FindMember` finds only members that were defined directly in the class or interface; it does not find inherited members.

> **Note:**
> `FindMember` is a helper method. It calls IMetaDataImport::FindMethod; if that call does not find a match, `FindMember` then calls IMetaDataImport::FindField.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
