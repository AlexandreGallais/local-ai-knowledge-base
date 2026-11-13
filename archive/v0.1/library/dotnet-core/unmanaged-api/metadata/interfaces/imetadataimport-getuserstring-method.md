---
title: "IMetaDataImport::GetUserString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getuserstring-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetUserString Method

Gets the literal string represented by the specified metadata token.

## Syntax

```cpp
HRESULT GetUserString (
   [in]   mdString    stk,
   [out]  LPWSTR      szString,
   [in]   ULONG       cchString,
   [out]  ULONG       *pchString
);
```

## Parameters

 `stk`
 [in] The String token to return the associated string for.

 `szString`
 [out] A copy of the requested string.

 `cchString`
 [in] The maximum size in wide characters of the requested `szString`.

 `pchString`
 [out] The size in wide characters of the returned `szString`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
