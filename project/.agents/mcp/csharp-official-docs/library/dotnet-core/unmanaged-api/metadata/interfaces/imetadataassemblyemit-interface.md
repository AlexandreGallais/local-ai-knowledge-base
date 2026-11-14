---
title: "IMetaDataAssemblyEmit Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit Interface

Provides methods that support the self-description model used by the common language runtime to resolve and consume resources.

## Methods

| Method | Description |
|------------|-----------------|
|DefineAssembly Method| Creates an assembly data structure containing metadata for the specified assembly, and returns the associated metadata token. |
|DefineAssemblyRef Method| Creates an `AssemblyRef` structure containing metadata for the assembly that this assembly references, and returns the associated metadata token. |
|DefineExportedType Method| Creates an `ExportedType` structure containing metadata for the specified exported type, and returns the associated metadata token. |
|DefineFile Method| Creates a `File` metadata structure containing metadata for assembly referenced by this assembly, and returns the associated metadata token. |
|DefineManifestResource Method| Creates a `ManifestResource` structure containing metadata for the specified manifest resource, and returns the associated metadata token. |
|SetAssemblyProps Method| Modifies the specified `Assembly` metadata structure. |
|SetAssemblyRefProps Method| Modifies the specified `AssemblyRef` metadata structure. |
|SetExportedTypeProps Method| Modifies the specified `ExportedType` metadata structure. |
|SetFileProps Method| Modifies the specified `File` metadata structure. |
|SetManifestResourceProps Method| Modifies the specified `ManifestResource` metadata structure. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
- IMetaDataAssemblyImport Interface
