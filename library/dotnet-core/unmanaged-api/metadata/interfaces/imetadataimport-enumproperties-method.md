---
title: "IMetaDataImport::EnumProperties Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumproperties-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumProperties Method

Enumerates PropertyDef tokens representing the properties of the type referenced by the specified TypeDef token.

## Syntax

```cpp
HRESULT EnumProperties (
   [in, out] HCORENUM    *phEnum,
   [in]      mdTypeDef   td,
   [out]     mdProperty  rProperties[],
   [in]      ULONG       cMax,
   [out]     ULONG       *pcProperties
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `td`
 [in] A TypeDef token representing the type with properties to enumerate.

 `rProperties`
 [out] The array used to store the PropertyDef tokens.

 `cMax`
 [in] The maximum size of the `rProperties` array.

 `pcProperties`
 [out] The number of PropertyDef tokens returned in `rProperties`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumProperties` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcProperties` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
