---
title: "IMetaDataAssemblyEmit::SetAssemblyRefProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-setassemblyrefprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::SetAssemblyRefProps Method

Modifies the specified `AssemblyRef` metadata structure.

## Syntax

```cpp
HRESULT SetAssemblyRefProps (
    [in] mdAssemblyRef              ar,
    [in] const void                 *pbPublicKeyOrToken,
    [in] ULONG                      cbPublicKeyOrToken,
    [in] LPCWSTR                    szName,
    [in] const ASSEMBLYMETADATA     *pMetaData,
    [in] const void                 *pbHashValue,
    [in] ULONG                      cbHashValue,
    [in] DWORD                      dwAssemblyRefFlags
);
```

## Parameters

 `ar`
 [in] The metadata token that specifies the `AssemblyRef` metadata structure to be modified.

 `pbPublicKeyOrToken`
 [in] The public key of the publisher of the referenced assembly.

 `cbPublicKeyOrToken`
 [in] The size in bytes of `pbPublicKeyOrToken`.

 `szName`
 [in] The human-readable text name of the assembly.

 `pMetaData`
 [in] A pointer to an ASSEMBLYMETADATA instance that contains the version, platform, and locale information for the assembly.

 `pbHashValue`
 [in] A pointer to the hash data associated with the assembly.

 `cbHashValue`
 [in] The size in bytes of `pbHashValue`.

 `dwAssemblyRefFlags`
 [in] A bitwise combination of CorAssemblyFlags values that specify attributes of the referenced assembly.

## Remarks

 To create an `AssemblyRef` metadata structure, use the IMetaDataAssemblyEmit::DefineAssemblyRef method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
