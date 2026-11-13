---
title: "IMetaDataAssemblyImport::EnumManifestResources Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-enummanifestresources-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::EnumManifestResources Method

Gets a pointer to an enumerator for the resources referenced in the current assembly manifest.

## Syntax

```cpp
HRESULT EnumManifestResources (
    [in, out] HCORENUM         *phEnum,
    [out] mdManifestResource   rManifestResources[],
    [in]  ULONG                cMax,
    [out] ULONG                *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be a null value when the `EnumManifestResources` method is called for the first time.

 `rManifestResources`
 [out] The array used to store the `mdManifestResource` metadata tokens.

 `cMax`
 [in] The maximum number of `mdManifestResource` tokens that can be placed in `rManifestResources`.

 `pcTokens`
 [out] The number of `mdManifestResource` tokens actually placed in `rManifestResources`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumManifestResources` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In this case, `pcTokens` is set to zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
