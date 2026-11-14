---
title: "IMetaDataImport2::GetVersionString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-getversionstring-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport2::GetVersionString Method

Gets the version number of the runtime that was used to build the assembly.

## Syntax

```cpp
HRESULT GetVersionString (
   [out] LPWSTR      pwzBuf,
   [in]  DWORD       ccBufSize,
   [out] DWORD       *pccBufSize
);
```

## Parameters

 `pwzBuf`
 [out] An array to store the string that specifies the version.

 `ccBufSize`
 [in] The size, in wide characters, of the `pwzBuf` array.

 `pccBufSize`
 [out] The number of wide characters, including a null terminator, returned in the `pwzBuf` array.

## Remarks

 The `GetVersionString` method gets the built-for version of the current metadata scope. If the scope has never been saved, it will not have a built-for version, and an empty string will be returned.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport2 Interface
- IMetaDataImport Interface
