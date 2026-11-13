---
title: "IMetaDataTables::GetCodedTokenInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatatables-getcodedtokeninfo-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
