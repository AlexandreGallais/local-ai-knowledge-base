---
title: "ICorDebugSymbolProvider::GetInstanceFieldSymbols Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getinstancefieldsymbols-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetInstanceFieldSymbols Method

Gets the instance field symbols that correspond to a typespec signature.

## Syntax

```cpp
HRESULT GetInstanceFieldSymbols(
   [in] ULONG32 cbSignature,
   [in, size_is(cbSignature)]  BYTE typeSig[],
   [in] ULONG32 cRequestedSymbols,
   [out] ULONG32 *pcFetchedSymbols,
   [out, size_is(cRequestedSymbols), length_is(*pcFetchedSymbols)] ICorDebugInstanceFieldSymbol *pSymbols[]
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
 [out] A pointer to an ICorDebugStaticFieldSymbol array that contains the requested instance field symbols.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- GetStaticFieldSymbols Method
- ICorDebugSymbolProvider Interface
