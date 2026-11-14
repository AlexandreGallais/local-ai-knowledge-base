---
title: "IMetaDataImport::EnumFields Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumfields-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumFields Method

Enumerates FieldDef tokens for the type referenced by the specified TypeDef token.

## Syntax

```cpp
HRESULT EnumFields (
   [in, out] HCORENUM    *phEnum,
   [in]      mdTypeDef   cl,
   [out]     mdFieldDef  rFields[],
   [in]      ULONG       cMax,
   [out]     ULONG       *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `cl`
 [in] The TypeDef token of the class whose fields are to be enumerated.

 `rFields`
 [out] The list of FieldDef tokens.

 `cMax`
 [in] The maximum size of the `rFields` array.

 `pcTokens`
 [out] The actual number of FieldDef tokens returned in `rFields`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumFields` returned successfully. |
| `S_FALSE` | There are no fields to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
