---
title: "ICorDebugSymbolProvider::GetMethodParameterSymbols Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getmethodparametersymbols-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetMethodParameterSymbols Method

Gets a method's parameter symbols given the relative virtual address (RVA) of that method.

## Syntax

```cpp
HRESULT GetMethodParameterSymbols(
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

- GetMethodLocalSymbols Method
- ICorDebugSymbolProvider Interface
