---
title: "IMetaDataEmit2::SaveDelta Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-savedelta-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit2::SaveDelta Method

Saves changes from the current edit-and-continue session to the specified file.

## Syntax

```cpp
HRESULT SaveDelta (
    [in] LPCWSTR     szFile,
    [in] DWORD       dwSaveFlags
);
```

## Parameters

 `szFile`
 [in] The file name under which to save changes.

 `dwSaveFlags`
 [in] Reserved. Must be zero.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataEmit2 Interface
- IMetaDataEmit Interface
