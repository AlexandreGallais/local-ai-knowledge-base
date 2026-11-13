---
title: "IMetaDataAssemblyImport::CloseEnum Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-closeenum-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
