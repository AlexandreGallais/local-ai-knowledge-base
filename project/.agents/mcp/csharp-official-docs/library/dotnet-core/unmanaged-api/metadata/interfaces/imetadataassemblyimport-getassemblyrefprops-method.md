---
title: "IMetaDataAssemblyImport::GetAssemblyRefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-getassemblyrefprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::GetAssemblyRefProps Method

Gets the set of properties for the assembly reference with the specified metadata signature.

## Syntax

```cpp
HRESULT GetAssemblyRefProps (
    [in]  mdAssemblyRef        mdar,
    [out] const void          **ppbPublicKeyOrToken,
    [out] ULONG                *pcbPublicKeyOrToken,
    [out] LPWSTR               szName,
    [in]  ULONG                cchName,
    [out] ULONG                *pchName,
    [out] ASSEMBLYMETADATA     *pMetaData,
    [out] const void           **ppbHashValue,
    [out] ULONG                *pcbHashValue,
    [out] DWORD                *pdwAssemblyRefFlags
);
```

## Parameters

 `mdar`\
 [in] The `mdAssemblyRef` metadata token that represents the assembly reference for which to get the properties.

 `ppbPublicKeyOrToken`\
 [out] A pointer to the public key or the metadata token.

 `pcbPublicKeyOrToken`\
 [out] The number of bytes in the returned public key or token.

 `szName`\
 [out] The simple name of the assembly.

 `cchName`\
 [in] The size, in wide chars, of `szName`.

 `pchName`\
 [out] A pointer to the number of wide chars actually returned in `szName`.

 `pMetaData`\
 [out] A pointer to an ASSEMBLYMETADATA structure that contains the assembly metadata.

 `ppbHashValue`\
 [out] A pointer to the hash value. This is the hash, using the SHA-1 algorithm, of the `PublicKey` property of the assembly being referenced.

 `pcbHashValue`\
 [out] The number of wide chars in the returned hash value.

 `pdwAssemblyRefFlags`\
 [out] A pointer to flags that describe the metadata applied to an assembly. The flags value is a combination of one or more CorAssemblyFlags values.

## Return Value

 This method returns S_OK if it succeeds; otherwise, it returns one of the error codes defined in the Winerror.h header file.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
