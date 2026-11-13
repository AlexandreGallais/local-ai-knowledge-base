---
title: "IMetaDataEmit::SetParamProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setparamprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetParamProps Method

Sets or changes features of a method parameter that was defined by a prior call to IMetaDataEmit::DefineParam.

## Syntax

```cpp
HRESULT SetParamProps (
    [in]  mdParamDef  pd,
    [in]  LPCWSTR     szName,
    [in]  DWORD       dwParamFlags,
    [in]  DWORD       dwCPlusTypeFlag,
    [in]  void const  *pValue,
    [in]  ULONG       cchValue
);
```

## Parameters

 `pd`
 [in] The token for the target parameter.

 `szName`
 [in] The name of the parameter in Unicode.

 `dwParamFlags`
 [in] The flags for the parameter.

 `dwCPlusTypeFlag`
 [in] The ELEMENT_TYPE_* for the constant value.

 `pValue`
 [in] The constant value for the parameter.

 `cchValue`
 [in] The size in (Unicode) characters of `pValue`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
