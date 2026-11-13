---
title: "ICorDebugSymbolProvider::GetStaticFieldSymbols Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getstaticfieldsymbols-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetStaticFieldSymbols Method

Gets the static field symbols that correspond to a typespec signature.

## Syntax

```cpp
HRESULT GetStaticFieldSymbols(
   [in] ULONG32 cbSignature,
   [in, size_is(cbSignature)]  BYTE typeSig[],
   [in] ULONG32 cRequestedSymbols,
   [out] ULONG32 *pcFetchedSymbols,
   [out, size_is(cRequestedSymbols), length_is(*pcFetchedSymbols)] ICorDebugStaticFieldSymbol *pSymbols[]
);
```

## Parameters

 `cbSignature`
 [in] The number of bytes in the `typeSig` array.

 `typeSig`
 [in] A byte array that contains the `typespec` signature.

 `cRequestedSymbols`
 [in] The number of symbols requested.

 `pcFetchedSymbols`
 [out] A pointer to the number of symbols retrieved by the method.

 `pSymbols`
 [out] A pointer to an ICorDebugStaticFieldSymbol array that contains the requested static field symbols.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- GetInstanceFieldSymbols Method
- ICorDebugSymbolProvider Interface
