---
title: "IMetaDataImport2::EnumMethodSpecs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-enummethodspecs-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport2::EnumMethodSpecs Method

Gets an enumerator for an array of MethodSpec tokens associated with the specified MethodDef or MemberRef token.

## Syntax

```cpp
HRESULT EnumMethodSpecs (
    [in, out] HCORENUM      *phEnum,
    [in]      mdToken       tk,
    [out]     mdMethodSpec  rMethodSpecs[],
    [in]      ULONG         cMax,
    [out]     ULONG         *pcMethodSpecs
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator for `rMethodSpecs`.

 `tk`
 [in] The MemberRef or MethodDef token that represents the method whose MethodSpec tokens are to be enumerated. If the value of `tk` is 0 (zero), all MethodSpec tokens in the scope will be enumerated.

 `rMethodSpecs`
 [out] The array of MethodSpec tokens to enumerate.

 `cMax`
 [in] The requested maximum number of tokens to place in `rMethodSpecs`.

 `pcMethodSpecs`
 [out] The returned number of tokens placed in `rMethodSpecs`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumMethodSpecs` returned successfully. |
| `S_FALSE` |`phEnum` has no member elements. In this case, `pcMethodSpecs` is set to 0 (zero).|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
