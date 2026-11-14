---
title: "IMetaDataImport::EnumTypeDefs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumtypedefs-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumTypeDefs Method

Enumerates TypeDef tokens representing all types within the current scope.

## Syntax

```cpp
HRESULT EnumTypeDefs (
   [out] HCORENUM   *phEnum,
   [in]  mdTypeDef  rTypeDefs[],
   [in]  ULONG      cMax,
   [out] ULONG      *pcTypeDefs
);
```

## Parameters

 `phEnum`
 [out] A pointer to the new enumerator. This must be NULL for the first call of this method.

 `rTypeDefs`
 [in] The array used to store the TypeDef tokens.

 `cMax`
 [in] The maximum size of the `rTypeDefs` array.

 `pcTypeDefs`
 [out] The number of TypeDef tokens returned in `rTypeDefs`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumTypeDefs` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcTypeDefs` is zero. |

## Remarks

 The TypeDef token <example-value> a type such as a class or an interface, as well as any type added via an extensibility mechanism.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
