---
title: "IMetaDataFilter::IsTokenMarked Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatafilter-istokenmarked-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataFilter::IsTokenMarked Method

Gets a value indicating whether the specified metadata token has been marked as processed.

## Syntax

```cpp
HRESULT IsTokenMarked (
    [in]  mdToken  tk,
    [out] BOOL     *pIsMarked
);
```

## Parameters

 `tk`
 [in] The token to examine for a processing mark.

 `pIsMarked`
 [out] A value that is `true` if `tk` has been processed; otherwise `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataFilter Interface
