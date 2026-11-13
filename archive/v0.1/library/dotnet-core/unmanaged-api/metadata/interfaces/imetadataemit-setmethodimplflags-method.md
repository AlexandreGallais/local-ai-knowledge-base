---
title: "IMetaDataEmit::SetMethodImplFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setmethodimplflags-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetMethodImplFlags Method

Sets or updates the metadata signature of the inherited method implementation that is referenced by the specified token.

## Syntax

```cpp
HRESULT SetMethodImplFlags (
    [in]  mdMethodDef   md,
    [in]  DWORD         dwImplFlags
);
```

## Parameters

 `md`
 [in] The token for the method to be changed.

 `dwImplFlags`
 [in] A combination of the values of the CorMethodImpl enumeration that specifies the method implementation features.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
