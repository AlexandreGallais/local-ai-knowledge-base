---
title: "ICorDebugDataTarget2::GetSymbolProviderForImage Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget2-getsymbolproviderforimage-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget2::GetSymbolProviderForImage Method

Returns the symbol-provider for a module from the base address of that module.

## Syntax

```cpp
HRESULT GetSymbolProviderForImage(
    [in] CORDB_ADDRESS imageBaseAddress,
    [out] ICorDebugSymbolProvider **ppSymProvider
);
```

## Parameters

 `imageBaseAddress`
 [in] A CORDB_ADDRESS value that represents the base address of a module.

 `ppSymProvider`
 [out] A pointer to the address of an ICorDebugSymbolProvider object.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDataTarget2 Interface
