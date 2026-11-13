---
title: "IMetaDataError::OnError Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataerror-onerror-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
