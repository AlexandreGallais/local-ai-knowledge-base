---
title: "IMetaDataAssemblyImport::EnumExportedTypes Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-enumexportedtypes-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::EnumExportedTypes Method

Enumerates the exported types referenced in the assembly manifest in the current metadata scope.

## Syntax

```cpp
HRESULT EnumExportedTypes (
    [in, out] HCORENUM     *phEnum,
    [out] mdExportedType   rExportedTypes[],
    [in]  ULONG            cMax,
    [out] ULONG            *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be a null value when the `EnumExportedTypes` method is called for the first time.

 `rExportedTypes`
 [out] The enumeration of `mdExportedType` metadata tokens.

 `cMax`
 [in] The maximum number of `mdExportedType` tokens that can be placed in the `rExportedTypes` array.

 `pcTokens`
 [out] The number of `mdExportedType` tokens actually placed in `rExportedTypes`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumExportedTypes` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In this case, `pcTokens` is set to zero. |

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataAssemblyImport Interface
