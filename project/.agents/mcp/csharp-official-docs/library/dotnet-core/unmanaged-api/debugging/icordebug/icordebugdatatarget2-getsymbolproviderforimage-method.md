---
title: "ICorDebugDataTarget2::GetSymbolProviderForImage Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget2-getsymbolproviderforimage-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
