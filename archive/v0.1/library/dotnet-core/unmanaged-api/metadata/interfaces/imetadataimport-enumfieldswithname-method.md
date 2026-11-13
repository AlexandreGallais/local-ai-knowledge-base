---
title: "IMetaDataImport::EnumFieldsWithName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumfieldswithname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumFieldsWithName Method

Enumerates FieldDef tokens of the specified type with the specified name.

## Syntax

```cpp
HRESULT EnumFieldsWithName (
   [in, out] HCORENUM    *phEnum,
   [in]  mdTypeDef       cl,
   [in]  LPCWSTR         szName,
   [out] mdFieldDef      rFields[],
   [in]  ULONG           cMax,
   [out] ULONG           *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `cl`
 [in] The token of the type whose fields are to be enumerated.

 `szName`
 [in] The field name that limits the scope of the enumeration.

 `rFields`
 [out] Array used to store the FieldDef tokens.

 `cMax`
 [in] The maximum size of the `rFields` array.

 `pcTokens`
 [out] The actual number of FieldDef tokens returned in `rFields`.

## Remarks

 Unlike IMetaDataImport::EnumFields, `EnumFieldsWithName` discards all field tokens that do not have the specified name.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumFieldsWithName` returned successfully. |
| `S_FALSE` | There are no fields to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
