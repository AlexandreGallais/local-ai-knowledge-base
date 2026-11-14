---
title: "ICorDebugVariableSymbol::GetSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablesymbol-getsize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableSymbol::GetSize Method

Gets the size of a variable in bytes.

## Syntax

```cpp
HRESULT GetSize(
   [out] ULONG32 *pcbValue
);
```

## Parameters

 `pcbValue`
A pointer to a 32-bit unsigned integer containing the size of the variable.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugVariableSymbol Interface
