---
title: "IMetaDataError Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataerror-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataError Interface

Provides a callback mechanism for reporting errors during the metadata merge.

> **Note:**
> The `IMetaDataError` interface must be implemented by the client.

## Methods

| Method | Description |
|------------|-----------------|
|OnError Method| Provides notification of errors that occur during the metadata merge. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
