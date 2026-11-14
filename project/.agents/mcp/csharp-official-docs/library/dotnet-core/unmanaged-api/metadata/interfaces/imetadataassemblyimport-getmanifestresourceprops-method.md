---
title: "IMetaDataAssemblyImport::GetManifestResourceProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-getmanifestresourceprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::GetManifestResourceProps Method

Gets the set of properties of the manifest resource with the specified metadata signature.

## Syntax

```cpp
HRESULT GetManifestResourceProps (
    [in]  mdManifestResource   mdmr,
    [out] LPWSTR               szName,
    [in]  ULONG                cchName,
    [out] ULONG                *pchName,
    [out] mdToken              *ptkImplementation,
    [out] DWORD                *pdwOffset,
    [out] DWORD                *pdwResourceFlags
);
```

## Parameters

 `mdmr`
 [in] An `mdManifestResource` token that represents the resource for which to get the properties.

 `szName`
 [out] The name of the resource.

 `cchName`
 [in] The size, in wide chars, of `szName`.

 `pchName`
 [out] A pointer to the number of wide chars actually returned in `szName`.

 `ptkImplementation`
 [out] A pointer to an `mdFile` token or an `mdAssemblyRef` token that represents the file or assembly, respectively, that contains the resource.

 `pdwOffset`
 [out] A pointer to a value that specifies the offset to the beginning of the resource within the file.

 `pdwResourceFlags`
 [out] A pointer to flags that describe the metadata applied to a resource. The flags value is a combination of one or more CorManifestResourceFlags values.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
