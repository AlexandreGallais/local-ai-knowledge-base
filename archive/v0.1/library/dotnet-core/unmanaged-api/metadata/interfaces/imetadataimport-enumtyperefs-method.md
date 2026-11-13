---
title: "IMetaDataImport::EnumTypeRefs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumtyperefs-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumTypeRefs Method

Enumerates TypeRef tokens defined in the current metadata scope.

## Syntax

```cpp
HRESULT EnumTypeRefs (
   [in, out] HCORENUM    *phEnum,
   [out] mdTypeRef       rTypeRefs[],
   [in]  ULONG           cMax,
   [out] ULONG           *pcTypeRefs
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `rTypeRefs`
 [out] The array used to store the TypeRef tokens.

 `cMax`
 [in] The maximum size of the `rTypeRefs` array.

 `pcTypeRefs`
 [out] A pointer to the number of TypeRef tokens returned in `rTypeRefs`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumTypeRefs` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcTypeRefs` is zero. |

## Remarks

 A TypeRef token <example-value> a reference to a type.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
