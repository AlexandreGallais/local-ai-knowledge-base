---
title: "IMetaDataImport2::GetGenericParamConstraintProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-getgenericparamconstraintprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport2::GetGenericParamConstraintProps Method

Gets the metadata associated with the generic parameter constraint represented by the specified constraint token.

## Syntax

```cpp
HRESULT GetGenericParamConstraintProps (
   [in]  mdGenericParamConstraint  gpc,
   [out] mdGenericParam            *ptGenericParam,
   [out] mdToken                   *ptkConstraintType
);
```

## Parameters

 `gpc`
 [in] The token to the generic parameter constraint for which to return the metadata.

 `ptGenericParam`
 [out] A pointer to the token that represents the generic parameter that is constrained.

 `ptkConstraintType`
 [out] A pointer to a TypeDef, TypeRef, or TypeSpec token that represents a constraint on `ptGenericParam`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
