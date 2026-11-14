---
title: "IMetaDataAssemblyImport::CloseEnum Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-closeenum-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::CloseEnum Method

Releases a reference to the specified enumeration instance.

## Syntax

```cpp
void CloseEnum (
    [in] HCORENUM     hEnum
);
```

## Parameters

 `hEnum`
 [in] The enumeration instance to be closed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
