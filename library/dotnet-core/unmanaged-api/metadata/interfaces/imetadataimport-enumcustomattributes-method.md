---
title: "IMetaDataImport::EnumCustomAttributes Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumcustomattributes-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumCustomAttributes Method

Enumerates custom attribute-definition tokens associated with the specified type or member.

## Syntax

```cpp
HRESULT EnumCustomAttributes (
   [in, out] HCORENUM      *phEnum,
   [in]  mdToken            tk,
   [in]  mdToken            tkType,
   [out] mdCustomAttribute  rCustomAttributes[],
   [in]  ULONG              cMax,
   [out, optional] ULONG   *pcCustomAttributes
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the returned enumerator.

 `tk`
 [in] A token for the scope of the enumeration, or zero for all custom attributes.

 `tkType`
 [in] A token for the constructor of the type of the attributes to be enumerated, or `null` for all types.

 `rCustomAttributes`
 [out] An array of custom attribute tokens.

 `cMax`
 [in] The maximum size of the `rCustomAttributes` array.

 `pcCustomAttributes`
 [out, optional] The actual number of token values returned in `rCustomAttributes`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumCustomAttributes` returned successfully. |
| `S_FALSE` | There are no custom attributes to enumerate. In that case, `pcCustomAttributes` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
