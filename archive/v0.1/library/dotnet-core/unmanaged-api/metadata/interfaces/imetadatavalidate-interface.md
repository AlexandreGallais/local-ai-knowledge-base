---
title: "IMetaDataValidate Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatavalidate-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
