---
title: "IMetaDataAssemblyImport::GetExportedTypeProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-getexportedtypeprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::GetExportedTypeProps Method

Gets the set of properties of the exported type with the specified metadata signature.

## Syntax

```cpp
HRESULT GetExportedTypeProps (
    [in]  mdExportedType    mdct,
    [out] LPWSTR            szName,
    [in]  ULONG             cchName,
    [out] ULONG             *pchName,
    [out] mdToken           *ptkImplementation,
    [out] mdTypeDef         *ptkTypeDef,
    [out] DWORD             *pdwExportedTypeFlags
);
```

## Parameters

 `mdct`
 [in] An `mdExportedType` metadata token that represents the exported type.

 `szName`
 [out] The name of the exported type.

 `cchName`
 [in] The size, in wide characters, of `szName`.

 `pchName`
 [out] The number of wide characters actually returned in `szName`

 `ptkImplementation`
 [out] An `mdFile`, `mdAssemblyRef`, or `mdExportedType` metadata token that contains or allows access to the properties of the exported type.

 `ptkTypeDef`
 [out] A pointer to an `mdTypeDef` token that represents a type in the file.

 `pdwExportedTypeFlags`
 [out] A pointer to the flags that describe the metadata applied to the exported type. The flags value can be one or more CorTypeAttr values.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
