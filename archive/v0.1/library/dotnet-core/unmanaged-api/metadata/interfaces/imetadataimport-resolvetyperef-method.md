---
title: "IMetaDataImport::ResolveTypeRef Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-resolvetyperef-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::ResolveTypeRef Method

Resolves a `System.Type` reference represented by the specified TypeRef token.

## Syntax

```cpp
HRESULT ResolveTypeRef (
   [in]  mdTypeRef       tr,
   [in]  REFIID          riid,
   [out] IUnknown        **ppIScope,
   [out] mdTypeDef       *ptd
);
```

## Parameters

 `tr`
 [in] The TypeRef metadata token to return the referenced type information for.

 `riid`
 [in] The IID of the interface to return in `ppIScope`. Typically, this would be IID_IMetaDataImport.

 `ppIScope`
 [out] An interface to the module scope in which the referenced type is defined.

 `ptd`
 [out] A pointer to a TypeDef token that represents the referenced type.

## Remarks

> **Important:**
> Do not use this method if multiple application domains are loaded. The method does not respect application domain boundaries. If multiple versions of an assembly are loaded, and they contain the same type with the same namespace, the method returns the module scope of the first type it finds.

 The `ResolveTypeRef` method searches for the type definition in other modules. If the type definition is found, `ResolveTypeRef` returns an interface to that module scope as well as the TypeDef token for the type.

 If the type reference to be resolved has a resolution scope of AssemblyRef, the `ResolveTypeRef` method searches for a match only in the metadata scopes that have already been opened with calls to either the IMetaDataDispenser::OpenScope method or the IMetaDataDispenser::OpenScopeOnMemory method. This is because `ResolveTypeRef` cannot determine from only the AssemblyRef scope where on disk or in the global assembly cache the assembly is stored.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
