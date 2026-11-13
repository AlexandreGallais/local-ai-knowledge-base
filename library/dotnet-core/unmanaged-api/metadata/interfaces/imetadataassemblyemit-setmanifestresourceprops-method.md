---
title: "IMetaDataAssemblyEmit::SetManifestResourceProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-setmanifestresourceprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::SetManifestResourceProps Method

Modifies the specified `ManifestResource` metadata structure.

## Syntax

```cpp
HRESULT SetManifestResourceProps (
    [in] mdManifestResource  mr,
    [in] mdToken             tkImplementation,
    [in] DWORD               dwOffset,
    [in] DWORD               dwResourceFlags
);
```

## Parameters

 `mr`
 [in] The token that specifies the `ManifestResource` metadata structure to be modified.

 `tkImplementation`
 [in] The token, of type `File` or `AssemblyRef`, that maps to the resource provider.

 `dwOffset`
 [in] The offset to the beginning of the resource within the file.

 `dwResourceFlags`
 [in] A bitwise combination of flag values that specify the attributes of the resource.

## Remarks

 To create a `ManifestResource` metadata structure, use the IMetaDataAssemblyEmit::DefineManifestResource method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
