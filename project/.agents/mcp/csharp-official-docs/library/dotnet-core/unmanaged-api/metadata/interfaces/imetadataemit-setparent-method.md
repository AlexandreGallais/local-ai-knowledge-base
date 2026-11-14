---
title: "IMetaDataEmit::SetParent Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setparent-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetParent Method

Establishes that the specified member, as defined by a prior call to IMetaDataEmit::DefineMemberRef, is a member of the specified type, as defined by a prior call to IMetaDataEmit::DefineTypeDef.

## Syntax

```cpp
HRESULT SetParent (
    [in]  mdMemberRef mr,
    [in]  mdToken     tk
);
```

## Parameters

 `mr`
 [in] The `mdMemberRef` token to receive a new parent.

 `tk`
 [in] The `mdToken` for the new parent.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
