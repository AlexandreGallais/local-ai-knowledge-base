---
title: "ICorDebugSymbolProvider::GetMethodLocalSymbols Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getmethodlocalsymbols-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetMethodLocalSymbols Method

Gets a method's local symbols given the relative virtual address (RVA) of that method.

## Syntax

```cpp
HRESULT GetMethodLocalSymbols(
   [in] ULONG32 nativeRVA,
   [in] ULONG32 cRequestedSymbols,
   [out] ULONG32 *pcFetchedSymbols,
   [out, size_is(cRequestedSymbols), length_is(*pcFetchedSymbols)] ICorDebugVariableSymbol *pSymbols[]
);
```

## Parameters

 `nativeRVA`
 [in] The native relative virtual address of the method.

 `cRequestedSymbols`
 [in] The number of local symbols requested.

 `pcFetchedSymbols`
 [out] A pointer to the number of symbols retrieved by the method.

 `pcFetchedSymbols`
 [out] A pointer to an ICorDebugVariableSymbol array that contains the method's local symbols.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- GetMethodParameterSymbols Method
- ICorDebugSymbolProvider Interface
