---
title: "IMetaDataAssemblyImport::EnumFiles Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-enumfiles-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::EnumFiles Method

Enumerates the files referenced in the current assembly manifest.

## Syntax

```cpp
HRESULT EnumFiles (
    [in, out] HCORENUM    *phEnum,
    [out] mdFile          rFiles[],
    [in]  ULONG           cMax,
    [out] ULONG           *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be a null value for the first call of this method.

 `rFiles`
 [out] The array used to store the `mdFile` metadata tokens.

 `cMax`
 [in] The maximum number of `mdFile` tokens that can be placed in `rFiles`.

 `pcTokens`
 [out] The number of `mdFile` tokens actually placed in `rFiles`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumFiles` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In this case, `pcTokens` is set to zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
