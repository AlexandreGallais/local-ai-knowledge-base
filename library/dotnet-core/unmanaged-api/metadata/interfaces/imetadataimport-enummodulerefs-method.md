---
title: "IMetaDataImport::EnumModuleRefs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummodulerefs-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumModuleRefs Method

Enumerates ModuleRef tokens that represent imported modules.

## Syntax

```cpp
HRESULT EnumModuleRefs (
   [in, out] HCORENUM     *phEnum,
   [out]     mdModuleRef  rModuleRefs[],
   [in]      ULONG        cMax,
   [out]     ULONG        *pcModuleRefs
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `rModuleRefs`
 [out] The array used to store the ModuleRef tokens.

 `cMax`
 [in] The maximum size of the `rModuleRefs` array.

 `pcModuleRefs`
 [out] The number of ModuleRef tokens returned in `rModuleRefs`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumModuleRefs` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcModuleRefs` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
