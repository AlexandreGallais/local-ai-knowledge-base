---
title: "IMetaDataEmit::DefineMethodImpl Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definemethodimpl-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineMethodImpl Method

Creates a definition for implementation of a method inherited from an interface, and returns a token to that method-implementation definition.

## Syntax

```cpp
HRESULT DefineMethodImpl (
    [in]  mdTypeDef         td,
    [in]  mdToken           <example-value>,
    [in]  mdToken           <example-value>
);
```

## Parameters

 `td`
 [in] The `mdTypedef` token of the implementing class.

 `tkBody`
 [in] The `mdMethodDef` or `mdMemberRef` token of the code body.

 `tkDecl`
 [in] The `mdMethodDef` or `mdMemberRef` token of the interface method being implemented.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
