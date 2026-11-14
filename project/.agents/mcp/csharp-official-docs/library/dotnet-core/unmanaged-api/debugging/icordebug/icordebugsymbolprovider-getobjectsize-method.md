---
title: "ICorDebugSymbolProvider::GetObjectSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getobjectsize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
