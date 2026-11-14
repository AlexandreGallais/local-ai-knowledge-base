---
title: "IMetaDataValidate Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatavalidate-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataValidate Interface

Provides methods to validate metadata signatures.

## Methods

| Method | Description |
|------------|-----------------|
|ValidateMetaData Method| Validates the metadata signatures of the objects in the current metadata scope. |
|ValidatorInit Method| Sets a flag that specifies the type of the module in the current metadata scope, and registers the specified callback method for validation errors. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
