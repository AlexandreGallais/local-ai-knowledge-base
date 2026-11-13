---
title: "IMetaDataAssemblyEmit::SetAssemblyProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyemit-setassemblyprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyEmit::SetAssemblyProps Method

Modifies the specified `Assembly` metadata structure.

## Syntax

```cpp
HRESULT SetAssemblyProps (
    [in] mdAssembly               pma,
    [in] const void               *pbPublicKey,
    [in] ULONG                    cbPublicKey,
    [in] ULONG                    ulHashAlgId,
    [in] LPCWSTR                  szName,
    [in] const ASSEMBLYMETADATA   *pMetaData,
    [in] DWORD                    dwAssemblyFlags
);
```

## Parameters

 `pma`
 [in] The metadata token that specifies the `Assembly` metadata structure to be modified.

 `pbPublicKey`
 [in] A pointer to the public key of the publisher of the assembly.

 `cbPublicKey`
 [in] The size in bytes of `pbPublicKey`.

 `ulHashAlgId`
 [in] The identifier for the hash algorithm used to hash the assembly files.

 `szName`
 [in] The human-readable text name of the assembly.

 `pMetaData`
 [in] A pointer to the ASSEMBLYMETADATA that contains version, platform, and locale information for the assembly.

 `dwAssemblyFlags`
 [in] A bitwise combination of CorAssemblyFlags values that specify various attributes of the assembly.

## Remarks

 To create an `Assembly` metadata structure, use the IMetaDataAssemblyEmit::DefineAssembly method.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyEmit Interface
