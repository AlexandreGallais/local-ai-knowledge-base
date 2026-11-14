---
title: "IMetaDataEmit::DefineField Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definefield-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineField Method

Creates a definition for a field with the specified metadata signature, and gets a token to that field definition.

## Syntax

```cpp
HRESULT DefineField (
    [in]  mdTypeDef   td,
    [in]  LPCWSTR     szName,
    [in]  DWORD       dwFieldFlags,
    [in]  PCCOR_SIGNATURE pvSigBlob,
    [in]  ULONG       cbSigBlob,
    [in]  DWORD       dwCPlusTypeFlag,
    [in]  void const  *pValue,
    [in]  ULONG       cchValue,
    [out] mdFieldDef  *pmd
);
```

## Parameters

 `td`
 [in] The `mdTypeDef` token for the enclosing class or interface.

 `szName`
 [in] The field name in Unicode.

 `dwFieldFlags`
 [in] The field attributes. This is a bitmask of `CorFieldAttr` values.

 `pvSigBlob`
 [in] The field signature as a BLOB.

 `cbSigBlob`
 [in] The count of bytes in `pvSigBlob`.

 `dwCPlusTypeFlag`
 [in] The `ELEMENT_TYPE_`*\** for the constant value. This is a `CorElementType` value. If not defining a constant value for the field, use `ELEMENT_TYPE_END`.

 `pValue`
 [in] The constant value for the field.

 `cchValue`
 [in] The size in (Unicode) characters of `pValue`.

 `pmd`
 [out] The `mdFieldDef` token assigned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
