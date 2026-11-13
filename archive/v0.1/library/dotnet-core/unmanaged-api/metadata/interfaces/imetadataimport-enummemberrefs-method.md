---
title: "IMetaDataImport::EnumMemberRefs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummemberrefs-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumMemberRefs Method

Enumerates MemberRef tokens representing members of the specified type.

## Syntax

```cpp
HRESULT EnumMemberRefs (
   [in, out] HCORENUM    *phEnum,
   [in]   mdToken        <example-value>,
   [out]  mdMemberRef    rMemberRefs[],
   [in]   ULONG          cMax,
   [out]  ULONG          *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `tkParent`
 [in] A TypeDef, TypeRef, MethodDef, or ModuleRef token for the type whose members are to be enumerated.

 `rMemberRefs`
 [out] The array used to store MemberRef tokens.

 `cMax`
 [in] The maximum size of the `rMemberRefs` array.

 `pcTokens`
 [out] The actual number of MemberRef tokens returned in `rMemberRefs`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumMemberRefs` returned successfully. |
| `S_FALSE` | There are no MemberRef tokens to enumerate. In that case, `pcTokens` is to zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
