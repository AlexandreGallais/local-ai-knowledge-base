---
title: "IMetaDataDispenserEx::GetCORSystemDirectory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenserex-getcorsystemdirectory-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataDispenserEx::GetCORSystemDirectory Method

Gets the directory that holds the current common language runtime (CLR). This method is supported only for use by .NET Framework out-of-process debuggers. If called from another component, it will return `E_NOTIMPL`.

## Syntax

```cpp
HRESULT GetCORSystemDirectory (
    [out] LPWSTR      szBuffer,
    [in]  DWORD       cchBuffer,
    [out] DWORD*      pchBuffer
);
```

## Parameters

 `szBuffer`
 [out] The buffer to receive the directory name.

 `cchBuffer`
 [in] The size, in bytes, of `szBuffer`.

 `pchBuffer`
 [out] The number of bytes actually returned in `szBuffer`.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataDispenserEx Interface
- IMetaDataDispenser Interface
