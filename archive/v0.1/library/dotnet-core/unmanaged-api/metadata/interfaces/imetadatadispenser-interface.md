---
title: "IMetaDataDispenser Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenser-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataDispenser Interface

Provides methods to create a new metadata scope, or open an existing one.

## Methods

| Method | Description |
|------------|-----------------|
|DefineScope Method| Creates a new area in memory where you can create new metadata. |
|OpenScope Method|Opens an existing, on-disk file and maps its metadata into memory.|
|OpenScopeOnMemory Method| Opens an area of memory that contains existing metadata. That is, this method opens a specified area of memory in which the existing data is treated as metadata. |

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataDispenserEx Interface
- Metadata Interfaces
