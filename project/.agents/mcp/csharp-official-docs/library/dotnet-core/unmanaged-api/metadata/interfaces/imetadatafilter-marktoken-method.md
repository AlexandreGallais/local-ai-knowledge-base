---
title: "IMetaDataFilter::MarkToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatafilter-marktoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataFilter::MarkToken <example-value>

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
