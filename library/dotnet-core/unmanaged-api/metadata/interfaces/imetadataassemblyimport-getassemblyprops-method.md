---
title: "IMetaDataAssemblyImport::GetAssemblyProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-getassemblyprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::GetAssemblyProps Method

Gets the set of properties for the assembly with the specified metadata signature.

## Syntax

```cpp
HRESULT GetAssemblyProps (
    [in]  mdAssembly          mda,
    [out] const void          **ppbPublicKey,
    [out] ULONG               *pcbPublicKey,
    [out] ULONG               *pulHashAlgId,
    [out] LPWSTR              szName,
    [in] ULONG                cchName,
    [out] ULONG               *pchName,
    [out] ASSEMBLYMETADATA    *pMetaData,
    [out] DWORD               *pdwAssemblyFlags
);
```

## Parameters

 `mda`
 [in]. The `mdAssembly` metadata token that represents the assembly for which to get the properties.

 `ppbPublicKey`
 [out] A pointer to the public key or the metadata token.

 `pcbPublicKey`
 [out] The number of bytes in the returned public key.

 `pulHashAlgId`
 [out] A pointer to the algorithm used to hash the files in the assembly.

 `szName`
 [out] The simple name of the assembly.

 `cchName`
 [in] The size, in wide chars, of `szName`.

 `pchName`
 [out] The number of wide chars actually returned in `szName`.

 `pMetaData`
 [out] A pointer to an ASSEMBLYMETADATA structure that contains the assembly metadata.

 `pdwAssemblyFlags`
 [out] Flags that describe the metadata applied to an assembly. This value is a combination of one or more CorAssemblyFlags values.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
