---
title: "IMetaDataImport::FindTypeRef Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-findtyperef-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::FindTypeRef Method

Gets a pointer to the TypeRef token for the `System.Type` reference that is in the specified scope and that has the specified name.

## Syntax

```cpp
HRESULT FindTypeRef (
   [in] mdToken        tkResolutionScope,
   [in]  LPCWSTR       szName,
   [out] mdTypeRef     *ptr
);
```

## Parameters

 `tkResolutionScope`
 [in] A ModuleRef, AssemblyRef, or TypeRef token that specifies the module, assembly, or type, respectively, in which the type reference is defined.

 `szName`
 [in] The name of the type reference to search for.

 `ptr`
 [out] A pointer to the matching TypeRef token.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
