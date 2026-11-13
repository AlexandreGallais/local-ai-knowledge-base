---
title: "IMetaDataAssemblyImport Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport Interface

Provides methods to access and examine the contents of an assembly manifest.

## Methods

| Method | Description |
|------------|-----------------|
|CloseEnum Method| Releases the handle to the specified enumerator. |
|EnumAssemblyRefs Method| Gets an interface pointer to an enumerator that contains the `mdAssemblyRef` tokens of the assemblies referenced by the assembly in the current metadata scope. |
|EnumExportedTypes Method| Gets an interface pointer to an enumerator that contains the `mdExportedType` tokens of the COM types referenced by the assembly in the current metadata scope. |
|EnumFiles Method| Gets an interface pointer to an enumerator that contains the `mdFile` tokens of the files referenced by the assembly in the current metadata scope. |
|EnumManifestResources Method| Gets an interface pointer to an enumerator that contains the `mdManifestResource` tokens of the resources referenced by the assembly in the current metadata scope. |
|FindAssembliesByName Method| Gets an array of `IMetaDataAssemblyImport` interface pointers for the assemblies with the specified name. |
|FindExportedTypeByName Method| Gets an `mdExportedType` token for the COM type with the specified name. |
|FindManifestResourceByName Method| Gets an `mdManifestResource` token for the resource with the specified name. |
|GetAssemblyFromScope Method| Gets the token for the assembly in the current metadata scope. |
|GetAssemblyProps Method| Gets the property settings of the specified assembly. |
|GetAssemblyRefProps Method| Gets the property settings of the specified `mdAssemblyRef` token. |
|GetExportedTypeProps Method| Gets the property settings of the specified COM type. |
|GetFileProps Method| Gets the property settings of the specified file. |
|GetManifestResourceProps Method| Gets the property settings of the specified manifest resource. |

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
- IMetaDataAssemblyEmit Interface
