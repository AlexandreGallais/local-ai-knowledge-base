---
title: "IMetaDataAssemblyImport::FindManifestResourceByName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-findmanifestresourcebyname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::FindManifestResourceByName Method

Gets a pointer to the manifest resource with the specified name.

## Syntax

```cpp
HRESULT FindManifestResourceByName (
    [in]  LPCWSTR                szName,
    [out] mdManifestResource     *ptkManifestResource
);
```

## Parameters

 `szName`
 [in] The name of the resource.

 `ptkManifestResource`
 [out] The array used to store the `mdManifestResource` metadata tokens, each of which represents a manifest resource.

## Remarks

 The `FindManifestResourceByName` method uses the standard rules employed by the common language runtime for resolving references.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
- How the Runtime Locates Assemblies
