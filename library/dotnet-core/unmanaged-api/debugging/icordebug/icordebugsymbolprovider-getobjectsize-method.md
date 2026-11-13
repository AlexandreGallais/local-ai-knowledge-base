---
title: "ICorDebugSymbolProvider::GetObjectSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getobjectsize-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetObjectSize Method

Returns the object size for an object based on its typespec signature.

## Syntax

```cpp
HRESULT GetObjectSize(
   [in] ULONG32 cbSignature,
   [in, size_is(cbSignature)]  BYTE typeSig[],
   [out] ULONG32 *pObjectSize
);
```

## Parameters

 `cbSignature`
 [in] The number of bytes in the typespec signature.

typeSig
 [in] The typespec signature.

 `pObjectSize`
 [out] A pointer to the size of the object.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugSymbolProvider Interface
