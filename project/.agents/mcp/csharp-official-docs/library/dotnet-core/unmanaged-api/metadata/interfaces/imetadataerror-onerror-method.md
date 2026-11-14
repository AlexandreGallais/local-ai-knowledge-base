---
title: "IMetaDataError::OnError Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataerror-onerror-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataError::OnError Method

Provides notification of errors that occur during the metadata merge.

## Syntax

```cpp
HRESULT OnError (
    [in] HRESULT   hrError,
    [in] mdToken   token
);
```

## Parameters

 `hrError`
 [in] The HRESULT error value returned to the calling method.

 `token`
 [in] The metadata token of the code object that was being merged when the error occurred.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataError Interface
