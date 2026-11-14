---
title: "IMetaDataEmit::SetMethodProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setmethodprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetMethodProps Method

Sets or updates the feature, stored at the specified relative virtual address, of a method defined by a prior call to IMetaDataEmit::DefineMethod.

## Syntax

```cpp
HRESULT SetMethodProps (
    [in]  mdMethodDef md,
    [in]  DWORD       dwMethodFlags,
    [in]  ULONG       ulCodeRVA,
    [in]  DWORD       dwImplFlags
);
```

## Parameters

 `md`
 [in] The token for the method to be changed.

 `dwMethodFlags`
 [in] The member attributes.

 `ulCodeRVA`
 [in] The address of the code.

 `dwImplFlags`
 [in] The implementation flags for the method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
