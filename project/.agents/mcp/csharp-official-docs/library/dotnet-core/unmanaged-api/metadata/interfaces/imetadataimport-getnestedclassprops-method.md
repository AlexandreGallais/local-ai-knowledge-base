---
title: "IMetaDataImport::GetNestedClassProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getnestedclassprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
 [in] A TypeDef token <example-value> the `System.Type` to return the parent class token for.

 `ptdEnclosingClass`
 [out] A pointer to the TypeDef token for the `System.Type` that `tdNestedClass` is nested in.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
