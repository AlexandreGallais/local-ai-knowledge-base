---
title: "IMetaDataEmit::SetPropertyProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setpropertyprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetPropertyProps Method

Sets the features stored in metadata for a property defined by a prior call to DefineProperty Method.

## Syntax

```cpp
HRESULT SetPropertyProps (
    [in]  mdProperty      pr,
    [in]  DWORD           dwPropFlags,
    [in]  DWORD           dwCPlusTypeFlag,
    [in]  void const      *pValue,
    [in]  ULONG           cchValue,
    [in]  mdMethodDef     mdSetter,
    [in]  mdMethodDef     mdGetter,
    [in]  mdMethodDef     rmdOtherMethods[]
);
```

## Parameters

 `pr`
 [in] The token for the property to be changed

 `dwPropFlags`
 [in] Property flags.

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
 [in] An array of other methods associated with the property. Terminate this array with an `mdTokenNil` token.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
