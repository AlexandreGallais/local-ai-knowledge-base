---
title: "IMetaDataAssemblyEmit::SetManifestResourceProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-setmanifestresourceprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::SetManifestResourceProps Method

Modifies the specified `ManifestResource` metadata structure.

## Syntax

```cpp
HRESULT SetManifestResourceProps (
    [in] mdManifestResource  mr,
    [in] mdToken             <example-value>,
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
