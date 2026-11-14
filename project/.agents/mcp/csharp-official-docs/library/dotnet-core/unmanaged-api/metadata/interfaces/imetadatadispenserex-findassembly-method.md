---
title: "IMetaDataDispenserEx::FindAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenserex-findassembly-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataDispenserEx::FindAssembly Method

This method is not implemented. If called, it returns E_NOTIMPL.

## Syntax

```cpp
HRESULT FindAssembly(
    [in]  LPCWSTR  szAppBase,
    [in]  LPCWSTR  szPrivateBin,
    [in]  LPCWSTR  szGlobalBin,
    [in]  LPCWSTR  szAssemblyName,
    [out] LPCWSTR  szName,
    [in]  ULONG    cchName,
    [out] ULONG    *pcName
);
```

## Parameters

 `szAppBase`
 [in] Not used.

 `szPrivateBin`
 [in] Not used.

 `szGlobalBin`
 [in] Not used.

 `szAssemblyName`
 [in] The assembly to be found.

 `szName`
 [out] The simple name of the assembly.

 `cchName`
 [in] The size, in bytes, of `szName`.

 `pcName`
 [out] The number of characters actually returned in `szName`.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataDispenserEx Interface
- IMetaDataDispenser Interface
