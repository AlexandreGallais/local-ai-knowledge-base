---
title: "IMetaDataImport2::EnumGenericParamConstraints Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-enumgenericparamconstraints-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport2::EnumGenericParamConstraints Method

Gets an enumerator for an array of generic parameter constraints associated with the generic parameter represented by the specified token.

## Syntax

```cpp
HRESULT EnumGenericParamConstraints (
    [in, out] HCORENUM                *phEnum,
    [in]  mdGenericParam              tk,
    [out] mdGenericParamConstraint    rGenericParamConstraints[],
    [in]  ULONG                       cMax,
    [out] ULONG                       *pcGenericParamConstraints
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `tk`
 [in]   A token that represents the generic parameter whose constraints are to be enumerated.

 `rGenericParamConstraints`
 [out] The array of generic parameter constraints to enumerate.

 `cMax`
 [in]   The requested maximum number of tokens to place in `rGenericParamConstraints`.

 `pcGenericParamConstraints`
 [out] A pointer to the number of tokens placed in `rGenericParamConstraints`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumGenericParameterConstraints` returned successfully. |
| `S_FALSE` |`phEnum` has no member elements. In this case, `pcGenericParameterConstraints` is set to 0 (zero).|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
