---
title: "IMetaDataDispenserEx::OpenScopeOnITypeInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenserex-openscopeonitypeinfo-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataDispenserEx::OpenScopeOnITypeInfo Method

This method is not implemented. If called, it returns E_NOTIMPL.

## Syntax

```cpp
HRESULT OpenScopeOnITypeInfo (
    [in]  ITypeInfo   *pITI,
    [in]  DWORD       dwOpenFlags,
    [in]  REFIID      riid,
    [out] IUnknown    **ppIUnk
);
```

## Parameters

 `pITI`
 [in] Pointer to an ITypeInfo interface that provides the type information on which to open the scope.

 `dwOpenFlags`
 [in] The open mode flags.

 `riid`
 [in] The desired interface.

 `ppIUnk`
 [out] Pointer to a pointer to the returned interface.

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataDispenserEx Interface
- IMetaDataDispenser Interface
