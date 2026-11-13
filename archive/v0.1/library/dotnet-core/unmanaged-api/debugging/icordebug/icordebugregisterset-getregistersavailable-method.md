---
title: "ICorDebugRegisterSet::GetRegistersAvailable Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset-getregistersavailable-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet::GetRegistersAvailable Method

Gets a bit mask indicating which registers in this ICorDebugRegisterSet are currently available.

## Syntax

```cpp
HRESULT GetRegistersAvailable (
    [out] ULONG64   *pAvailable
);
```

## Parameters

 `pAvailable`
 [out] A bit mask that indicates which registers are currently available.

## Remarks

A register may be unavailable if its value cannot be determined for the given situation.

The returned mask contains a bit for each register (1 << the register index). The bit value is 1 if the register is available, or 0 if it is not available.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugRegisterSet Interface
- ICorDebugRegisterSet2 Interface
