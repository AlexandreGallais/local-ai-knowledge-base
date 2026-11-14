---
title: "IMetaDataError Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataerror-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
