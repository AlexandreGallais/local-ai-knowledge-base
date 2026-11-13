---
title: "IMetaDataImport2::EnumGenericParams Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-enumgenericparams-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport2::EnumGenericParams Method

Gets an enumerator for an array of generic parameter tokens associated with the specified TypeDef or MethodDef token.

## Syntax

```cpp
HRESULT EnumGenericParams (
   [in, out] HCORENUM     *phEnum,
   [in]  mdToken          tk,
   [out] mdGenericParam   rGenericParams[],
   [in]  ULONG            cMax,
   [out] ULONG            *pcGenericParams
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `tk`
 [in] The TypeDef or MethodDef token whose generic parameters are to be enumerated.

 `rGenericParams`
 [out] The array of generic parameters to enumerate.

 `cMax`
 [in] The requested maximum number of tokens to place in `rGenericParams`.

 `pcGenericParams`
 [out] The returned number of tokens placed in `rGenericParams`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumGenericParams` returned successfully. |
| `S_FALSE` |`phEnum` has no member elements. In this case, `pcGenericParams` is set to 0 (zero).|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
