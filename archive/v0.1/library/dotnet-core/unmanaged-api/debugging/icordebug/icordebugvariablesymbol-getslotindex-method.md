---
title: "ICorDebugVariableSymbol::GetSlotIndex Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablesymbol-getslotindex-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugVariableSymbol::GetSlotIndex Method

Gets the managed slot index of a local variable.

## Syntax

```cpp
HRESULT GetSlotIndex(
   [out] ULONG32 *pSlotIndex
);
```

## Parameters

 `pSlotIndex`
 [out] A pointer to the local variable's slot index.

## Return Value

 `S_OK` if successful. `E_FAIL` if the variable is a function argument.

## Remarks

The managed slot index of a local variable can be used to retrieve the variable's metadata information

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugVariableSymbol Interface
