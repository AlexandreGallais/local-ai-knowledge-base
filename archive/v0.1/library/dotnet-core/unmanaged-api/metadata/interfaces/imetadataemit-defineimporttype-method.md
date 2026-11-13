---
title: "IMetaDataEmit::DefineImportType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-defineimporttype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineImportType Method

Creates a reference to the specified type that is defined outside the current scope, and defines a token for that reference.

## Syntax

```cpp
HRESULT DefineImportType (
    [in]  IMetaDataAssemblyImport  *pAssemImport,
    [in]  const void               *pbHashValue,
    [in]  ULONG                    cbHashValue,
    [in]  IMetaDataImport          *pImport,
    [in]  mdTypeDef                tdImport,
    [in]  IMetaDataAssemblyEmit    *pAssemEmit,
    [out] mdTypeRef                *ptr
);
```

## Parameters

 `pAssemImport`
 [in] An IMetaDataAssemblyImport interface that represents the assembly from which the target type is imported.

 `pbHashValue`
 [in] An array that contains the hash for the assembly specified by `pAssemImport`.

 `cbHashValue`
 [in] The number of bytes in the `pbHashValue` array.

 `pImport`
 [in] An IMetaDataImport interface that represents the metadata scope from which the target type is imported.

 `tdImport`
 [in] An `mdTypeDef` token that specifies the target type.

 `pAssemEmit`
 [in] An IMetaDataAssemblyEmit interface that represents the assembly into which the target type is imported.

 `ptr`
 [out] The `mdTypeRef` token that is defined in the current scope for the type reference.

## Remarks

 Prior to calling the IMetaDataEmit::DefineImportMember method, you can use the `DefineImportType` method to create a type reference, in the current scope, for the member's parent class or parent interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
