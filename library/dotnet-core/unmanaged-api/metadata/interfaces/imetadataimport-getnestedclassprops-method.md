---
title: "IMetaDataImport::GetNestedClassProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getnestedclassprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetNestedClassProps Method

Gets the TypeDef token for the parent `System.Type` of the specified nested type.

## Syntax

```cpp
HRESULT GetNestedClassProps (
   [in]   mdTypeDef      tdNestedClass,
   [out]  mdTypeDef      *ptdEnclosingClass
);
```

## Parameters

 `tdNestedClass`
 [in] A TypeDef token representing the `System.Type` to return the parent class token for.

 `ptdEnclosingClass`
 [out] A pointer to the TypeDef token for the `System.Type` that `tdNestedClass` is nested in.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
