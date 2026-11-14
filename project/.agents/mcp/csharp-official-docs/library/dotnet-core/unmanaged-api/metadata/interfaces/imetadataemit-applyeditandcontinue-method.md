---
title: "IMetaDataEmit::ApplyEditAndContinue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-applyeditandcontinue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::ApplyEditAndContinue Method

Updates the current assembly scope with the changes made in the specified metadata.

## Syntax

```cpp
HRESULT ApplyEditAndContinue (
    [in]  IUnknown    *pImport
);
```

## Parameters

 `pImport`
 \[in\] Pointer to an IUnknown object that represents the delta metadata from the portable executable (PE) file.

 The delta metadata is the block of metadata that includes the changes that were made to the copy of the module's actual metadata.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
