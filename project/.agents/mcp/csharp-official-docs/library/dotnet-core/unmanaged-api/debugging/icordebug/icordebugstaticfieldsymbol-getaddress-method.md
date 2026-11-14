---
title: "ICorDebugStaticFieldSymbol::GetAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstaticfieldsymbol-getaddress-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStaticFieldSymbol::GetAddress Method

Gets the address of a static field.

## Syntax

```cpp
HRESULT GetAddress(
   [out] CORDB_ADDRESS *pRVA
);
```

## Parameters

pRVA
 [out] A pointer to the relative virtual address (RVA) of the static field.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugStaticFieldSymbol Interface
