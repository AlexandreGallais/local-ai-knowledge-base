---
title: "IMetaDataAssemblyEmit::DefineAssemblyRef Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-defineassemblyref-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::DefineAssemblyRef Method

Creates an `AssemblyRef` structure containing metadata for the assembly that this assembly references, and returns the associated metadata token.

## Syntax

```cpp
HRESULT DefineAssemblyRef (
    [in]  void                *pbPublicKeyOrToken,
    [in]  ULONG               cbPublicKeyOrToken,
    [in]  LPCWSTR             szName,
    [in]  ASSEMBLYMETADATA    pMetaData,
    [in]  void                *pbHashValue,
    [in]  ULONG               cbHashValue,
    [in]  DWORD               dwAssemblyRefFlags,
    [out] mdAssemblyRef       *pmdar
);
```

## Parameters

 `pbPublicKeyOrToken`
 [in] The public key of the publisher of the referenced assembly. The helper function StrongNameTokenFromAssembly can be used to get the hash of the public key to pass as this parameter.

 `cbPublicKeyOrToken`
 [in] The size in bytes of `pbPublicKeyOrToken`.

 `szName`
 [in] The human-readable text name of the assembly. This value must not exceed 1024 characters.

 `pMetaData`
 [in] An ASSEMBLYMETADATA instance that contains the version, platform and locale information of the referenced assembly.

 `pbHashValue`
 [in] The hash data associated with the referenced assembly. Optional.

 `cbHashValue`
 [in] The size in bytes of `pbHashValue`.

 `dwAssemblyRefFlags`
 [in] A bitwise combination of CorAssemblyFlags values that influence the behavior of the execution engine.

 `pmdar`
 [out] A pointer to the returned `AssemblyRef` metadata token.

## Remarks

 One `AssemblyRef` metadata structure must be defined for each assembly that this assembly references.

 At runtime, the details of a referenced assembly are passed to the assembly resolver with an indication that they represent the "as built" information. The assembly resolver then applies policy.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
