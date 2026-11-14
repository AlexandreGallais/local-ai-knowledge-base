---
title: "ICorDebugVariableSymbol::SetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablesymbol-setvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableSymbol::SetValue Method

Assigns the value of a byte array to a variable.

## Syntax

```cpp
HRESULT SetValue(
   [in] ULONG32 offset,
   [in] DWORD threadID,
   [in] ULONG32 cbContext,
   [in, size_is(cbContext)] BYTE context[],
   [in] ULONG32 cbValue,
   [in, size_is(cbValue)] BYTE pValue[]
);
```

## Parameters

 `offset`
 [in] The starting offset in the variable at which to set the value. This parameter is used when writing to member fields in an object.

 `threadID`
 [in] The thread identifier of the thread whose context must be updated to reflect the new value.

 `cbContext`
 [in] The size in bytes of the thread context.

 `context`
 [in] The thread context used to write the value.

 `cbValue`
 [in] The size in bytes of the `pValue` buffer.

 `pValue`
 [in] The buffer that contains the value to set.

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
