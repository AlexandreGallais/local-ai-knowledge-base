---
title: "IMetaDataFilter::MarkToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatafilter-marktoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataFilter::MarkToken Method

Sets a value indicating that the specified metadata token has been processed.

## Syntax

```cpp
HRESULT MarkToken (
    [in] mdToken   tk
);
```

## Parameters

 `tk`
 [in] The token to mark as processed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataFilter Interface
