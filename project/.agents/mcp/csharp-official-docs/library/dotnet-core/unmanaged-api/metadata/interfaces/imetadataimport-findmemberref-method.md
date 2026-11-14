---
title: "IMetaDataImport::FindMemberRef Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-findmemberref-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::FindMemberRef Method

Gets a pointer to the MemberRef token for the member reference that is enclosed by the specified `System.Type` and that has the specified name and metadata signature.

## Syntax

```cpp
HRESULT FindMemberRef (
   [in]  mdTypeRef          td,
   [in]  LPCWSTR            szName,
   [in]  PCCOR_SIGNATURE    pvSigBlob,
   [in]  ULONG              cbSigBlob,
   [out] mdMemberRef        *pmr
);
```

## Parameters

 `td`
 [in] The TypeRef token for the class or interface that encloses the member reference to search for. If this value is `mdTokenNil`, the lookup is done for a global variable or a global-function reference.

 `szName`
 [in] The name of the member reference to search for.

 `pvSigBlob`
 [in] A pointer to the binary metadata signature of the member reference.

 `cbSigBlob`
 [in] The size in bytes of `pvSigBlob`.

 `pmr`
 [out] A pointer to the matching MemberRef token.

## Remarks

 You specify the member using its enclosing class or interface (`td`), its name (`szName`), and optionally its signature (`pvSigBlob`).

 The signature passed to `FindMemberRef` must have been generated in the current scope, because signatures are bound to a particular scope. A signature can embed a token that identifies the enclosing class or value type. The token is an index into the local TypeDef table. You cannot build a runtime signature outside the context of the current scope and use that signature as input to `FindMemberRef`.

 `FindMemberRef` finds only member references that were defined directly in the class or interface; it does not find inherited member references.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
