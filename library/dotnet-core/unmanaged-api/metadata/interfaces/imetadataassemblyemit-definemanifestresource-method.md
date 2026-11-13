---
title: "IMetaDataAssemblyEmit::DefineManifestResource Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-definemanifestresource-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::DefineManifestResource Method

Creates a `ManifestResource` structure containing metadata for the specified manifest resource, and returns the associated metadata token.

## Syntax

```cpp
HRESULT DefineManifestResource (
    [in] LPCWSTR                szName,
    [in] mdToken                tkImplementation,
    [in] DWORD                  dwOffset,
    [in] DWORD                  dwResourceFlags,
    [out] mdManifestResource    *pmdmr
);
```

## Parameters

 `szName`
 [in] The name of the resource.

 `tkImplementation`
 [in] A metadata token of type `mdtFile` or `mdtAssemblyRef` that maps to the resource provider. A NULL value indicates that the file in which the metadata is embedded is the resource provider.

 `dwOffset`
 [in] The offset to the beginning of the resource within the file. For resources in standalone files, this will always be zero. If the resource is embedded in a PE (portable executable) file, this is an offset of the resource BLOB, which starts at the location specified in the cor.h header file.

 `dwResourceFlags`
 [in] A bitwise combination of flag values that specify property settings for the resource definition.

 `pmdmr`
 [out] A pointer to the returned metadata token.

## Remarks

 One `ManifestResource` metadata structure must be defined for each resource that is implemented in each of the assembly's files.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
