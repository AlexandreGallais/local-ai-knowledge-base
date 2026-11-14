---
title: "IMetaDataFilter Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatafilter-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataFilter Interface

Provides methods for marking and filtering metadata tokens to avoid repeating actions that have already been taken.

## Methods

| Method | Description |
|------------|-----------------|
|IsTokenMarked Method| Gets a value indicating whether the specified metadata token has been processed. |
|MarkToken <example-value>| Sets a value indicating that the specified metadata token has been processed. |
|UnmarkAll Method| Removes the processing marks from all the tokens in the current metadata scope. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
