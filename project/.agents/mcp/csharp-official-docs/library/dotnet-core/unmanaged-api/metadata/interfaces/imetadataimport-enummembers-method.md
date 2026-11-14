---
title: "IMetaDataImport::EnumMembers Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummembers-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumMembers Method

Enumerates MemberDef tokens representing members of the specified type.

## Syntax

```cpp
HRESULT EnumMembers (
   [in, out]  HCORENUM    *phEnum,
   [in]  mdTypeDef   cl,
   [out] mdToken     <example-value>[],
   [in]  ULONG       cMax,
   [out] ULONG       *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `cl`
 [in] A TypeDef token <example-value> the type whose members are to be enumerated.

 `rMembers`
 [out] The array used to hold the MemberDef tokens.

 `cMax`
 [in] The maximum size of the `rMembers` array.

 `pcTokens`
 [out] The actual number of MemberDef tokens returned in `rMembers`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumMembers` returned successfully. |
| `S_FALSE` | There are no MemberDef tokens to enumerate. In that case, `pcTokens` is zero. |

## Remarks

 When enumerating collections of members for a class, `EnumMembers` returns only members (fields and methods, but **not** properties or events) defined directly on the class. It does not return any members that the class inherits, even if the class provides an implementation for those inherited members. To enumerate inherited members, the caller must explicitly walk the inheritance chain. Note that the rules for the inheritance chain may vary depending on the language or compiler that emitted the original metadata.

 Properties and events are not enumerated by `EnumMembers`. To enumerate those, use EnumProperties or EnumEvents.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
