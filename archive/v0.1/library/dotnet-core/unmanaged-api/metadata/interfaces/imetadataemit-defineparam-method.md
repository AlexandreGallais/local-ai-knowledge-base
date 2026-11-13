---
title: "IMetaDataEmit::DefineParam Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-defineparam-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineParam Method

Creates a parameter definition with the specified signature for the method referenced by the specified token, and gets a token for that parameter definition.

## Syntax

```cpp
HRESULT DefineParam (
    [in]  mdMethodDef md,
    [in]  ULONG       ulParamSeq,
    [in]  LPCWSTR     szName,
    [in]  DWORD       dwParamFlags,
    [in]  DWORD       dwCPlusTypeFlag,
    [in]  void const  *pValue,
    [in]  ULONG       cchValue,
    [out] mdParamDef  *ppd
);
```

## Parameters

 `md`
 [in] The token for the method whose parameter is being defined.

 `ulParamSeq`
 [in] The parameter sequence number.

 `szName`
 [in] The name of the parameter in Unicode.

 `dwParamFlags`
 [in] Flags for the parameter. This is a bitmask of `CorParamAttr` values.

 `dwCPlusTypeFlag`
 [in] `ELEMENT_TYPE_`*\** for the constant value.

 `pValue`
 [in] The constant value for the parameter.

 `cchValue`
 [in] The size, in Unicode characters, of `pValue`.

 `ppd`
 [out] The `mdParamDef` token assigned.

## Remarks

 The sequence values in `ulParamSeq` begin with 1 for parameters. A return value has a sequence number of 0.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
