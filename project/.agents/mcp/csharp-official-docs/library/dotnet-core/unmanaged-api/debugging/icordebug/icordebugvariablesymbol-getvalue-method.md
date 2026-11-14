---
title: "ICorDebugVariableSymbol::GetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablesymbol-getvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableSymbol::GetValue Method

Gets the value of a variable as a byte array.

## Syntax

```cpp
HRESULT GetValue(
   [in] ULONG32 offset,
   [in] ULONG32 cbContext,
   [in, size_is(cbContext)] BYTE context[],
   [in] ULONG32 cbValue,
   [out] ULONG32 *pcbValue,
   [out, size_is(cbValue), length_is(*pcbValue)] BYTE pValue[]
);
```

## Parameters

 `offset`
 [in] The starting offset in the variable from which to read the value. This parameter is used when reading member fields in an object.

 `cbContext`
 [in] The size in bytes of the `context` argument.

 `context`
 [in] The thread context used to read the value.

 `cbValue`
 [in] The size in bytes of the `pValue` buffer.

 `pcbValue`
 [out] The number of bytes actually written to the `pValue` buffer.

 `pValue`
 [out] A byte array that contains the value of the variable.

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
