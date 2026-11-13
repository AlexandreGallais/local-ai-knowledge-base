---
title: "IMetaDataEmit::SetRVA Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setrva-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
