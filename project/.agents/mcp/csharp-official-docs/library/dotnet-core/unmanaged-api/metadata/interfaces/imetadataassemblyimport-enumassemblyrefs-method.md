---
title: "IMetaDataAssemblyImport::EnumAssemblyRefs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-enumassemblyrefs-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::EnumAssemblyRefs Method

Enumerates the `mdAssemblyRef` instances that are defined in the assembly manifest.

## Syntax

```cpp
HRESULT EnumAssemblyRefs (
    [in, out] HCORENUM        *phEnum,
    [out]     mdAssemblyRef   rAssemblyRefs[],
    [in]      ULONG           cMax,
    [out]     ULONG           *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be a null value when the `EnumAssemblyRefs` method is called for the first time.

 `rAssemblyRefs`
 [out] The enumeration of `mdAssemblyRef` metadata tokens.

 `cMax`
 [in] The maximum number of tokens that can be placed in the `rAssemblyRefs` array.

 `pcTokens`
 [out] The number of tokens actually placed in `rAssemblyRefs`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumAssemblyRefs` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In this case, `pcTokens` is set to zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
