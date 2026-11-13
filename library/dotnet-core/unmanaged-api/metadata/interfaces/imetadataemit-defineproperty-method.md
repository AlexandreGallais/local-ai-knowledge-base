---
title: "IMetaDataEmit::DefineProperty Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-defineproperty-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineProperty Method

Creates a property definition for the specified type, with the specified `get` and `set` method accessors, and gets a token to that property definition.

## Syntax

```cpp
HRESULT DefineProperty (
    [in]  mdTypeDef          td,
    [in]  LPCWSTR            szProperty,
    [in]  DWORD              dwPropFlags,
    [in]  PCCOR_SIGNATURE    pvSig,
    [in]  ULONG              cbSig,
    [in]  DWORD              dwCPlusTypeFlag,
    [in]  void const         *pValue,
    [in]  ULONG              cchValue,
    [in]  mdMethodDef        mdSetter,
    [in]  mdMethodDef        mdGetter,
    [in]  mdMethodDef        rmdOtherMethods[],
    [out] mdProperty         *pmdProp
);
```

## Parameters

 `td`
 [in] The token for class or interface on which the property is being defined.

 `szProperty`
 [in] The name of the property.

 `dwPropFlags`
 [in] The property flags.

 `pvSig`
 [in] The property signature.

 `cbSig`
 [in] The count of bytes in `pvSig`.

 `dwCPlusTypeFlag`
 [in] The type of the property's default value.

 `pValue`
 [in] The default value for the property.

 `cchValue`
 [in] The count of (Unicode) characters in `pValue`.

 `mdSetter`
 [in] The method that sets the property value.

 `mdGetter`
 [in] The method that gets the property value.

 `rmdOtherMethods[]`
 [in] An array of other methods associated with the property. Terminate the array with an `mdTokenNil`.

 `pmdProp`
 [out] The `mdProperty` token assigned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
