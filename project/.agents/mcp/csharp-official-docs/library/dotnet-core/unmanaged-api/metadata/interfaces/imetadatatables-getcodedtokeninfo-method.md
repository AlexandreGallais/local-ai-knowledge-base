---
title: "IMetaDataTables::GetCodedTokenInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getcodedtokeninfo-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataTables::GetCodedTokenInfo Method

Gets a pointer to an array of tokens associated with the specified row index.

## Syntax

```cpp
HRESULT GetCodedTokenInfo (
    [in]  ULONG       ixCdTkn,
    [out] ULONG       *pcTokens,
    [out] ULONG       **ppTokens,
    [out] const char  **ppName
);
```

## Parameters

 `ixCdTkn`
 [in] The kind of coded token to return.

 `pcTokens`
 [out] A pointer to the length of `ppTokens`.

 `ppTokens`
 [out] A pointer to a pointer to an array that contains the list of returned tokens.

 `ppName`
 [out] A pointer to a pointer to the name of the token at `ixCdTkn`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataTables Interface
- IMetaDataTables2 Interface
