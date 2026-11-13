---
title: "IMetaDataEmit::SetFieldProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setfieldprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetFieldProps Method

Sets or updates the default value for the field referenced by the specified field token.

## Syntax

```cpp
HRESULT SetFieldProps (
    [in]  mdFieldDef  fd,
    [in]  DWORD       dwFieldFlags,
    [in]  DWORD       dwCPlusTypeFlag,
    [in]  void const  *pValue,
    [in]  ULONG       cchValue
);
```

## Parameters

 `fd`
 [in] The token for the target field.

 `dwFieldFlags`
 [in] Field attributes. This is a bitmask of `CorFieldAttr` values.

 `dwCPlusTypeFlag`
 [in] The `ELEMENT_TYPE_`*\** for the constant value. This is a `CorElementType` value. If a constant is not being defined, set this value to `ELEMENT_TYPE_END`.

 `pValue`
 [in] The constant value for the field.

 `cchValue`
 [in] The size, in Unicode characters, of `pValue`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
