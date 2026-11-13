---
title: "IMetaDataImport::EnumMembersWithName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummemberswithname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumMembersWithName Method

Enumerates MemberDef tokens representing members of the specified type with the specified name.

## Syntax

```cpp
HRESULT EnumMembersWithName (
   [in, out] HCORENUM    *phEnum,
   [in]      mdTypeDef   cl,
   [in]      LPCWSTR     szName,
   [out]     mdToken     <example-value>[],
   [in]      ULONG       cMax,
   [out]     ULONG       *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `cl`
 [in] A TypeDef token <example-value> the type with members to enumerate.

 `szName`
 [in] The member name that limits the scope of the enumerator.

 `rMembers`
 [out] The array used to store the MemberDef tokens.

 `cMax`
 [in] The maximum size of the `rMembers` array.

 `pcTokens`
 [out] The actual number of MemberDef tokens returned in `rMembers`.

## Remarks

 This method enumerates fields and methods, but not properties or events. Unlike IMetaDataImport::EnumMembers, `EnumMembersWithName` discards all field and member tokens that do not have the specified name.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumTypeDefs` returned successfully. |
| `S_FALSE` | There are no MemberDef tokens to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
