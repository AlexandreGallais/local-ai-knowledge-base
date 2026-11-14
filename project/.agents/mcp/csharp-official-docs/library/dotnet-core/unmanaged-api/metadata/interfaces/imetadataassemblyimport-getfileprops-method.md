---
title: "IMetaDataAssemblyImport::GetFileProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-getfileprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::GetFileProps Method

Gets the properties of the file with the specified metadata signature.

## Syntax

```cpp
HRESULT GetFileProps (
    [in]  mdFile      mdf,
    [out] LPWSTR      szName,
    [in]  ULONG       cchName,
    [out] ULONG       *pchName,
    [out] const void  **ppbHashValue,
    [out] ULONG       *pcbHashValue,
    [out] DWORD       *pdwFileFlags
);
```

## Parameters

 `mdf`
 [in] The `mdFile` metadata token that represents the file for which to get the properties.

 `szName`
 [out] The simple name of the file.

 `cchName`
 [in] The size, in wide chars, of `szName`.

 `pchName`
 [out] The number of wide chars actually returned in `szName`.

 `ppbHashValue`
 [out] A pointer to the hash value. This is the hash, using the SHA-1 algorithm, of the file.

 `pcbHashValue`
 [out] The number of wide chars in the returned hash value.

 `pdwFileFlags`
 [out] A pointer to the flags that describe the metadata applied to a file. The flags value is a combination of one or more CorFileFlags values.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
