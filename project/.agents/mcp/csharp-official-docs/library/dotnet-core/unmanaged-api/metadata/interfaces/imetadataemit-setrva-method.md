---
title: "IMetaDataEmit::SetRVA Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setrva-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetRVA Method

Sets the relative virtual address of the specified method.

## Syntax

```cpp
HRESULT SetRVA (
    [in]  mdMethodDef  md,
    [in]  ULONG        ulRVA
);
```

## Parameters

 `md`
 [in] The token for the target method or method implementation.

 `ulRVA`
 [in] The address of the code or data area.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
