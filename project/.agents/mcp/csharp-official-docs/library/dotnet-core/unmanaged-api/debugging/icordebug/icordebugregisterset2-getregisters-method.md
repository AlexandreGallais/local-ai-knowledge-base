---
title: "ICorDebugRegisterSet2::GetRegisters Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset2-getregisters-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet2::GetRegisters method

Gets the value of each register (for the platform on which code is currently executing) that is specified by the given bit mask.

## Syntax

```cpp
HRESULT GetRegisters (
    [in] ULONG32 maskCount,
    [in, size_is(maskCount)] BYTE mask[],
    [in] ULONG32 regCount,
    [out, size_is(regCount)] CORDB_REGISTER regBuffer[]
);
```

## Parameters

 `maskCount`
 [in] The size, in bytes, of the `mask` array.

 `mask`
 [in] An array of bytes, each bit of which corresponds to a register. If the bit is 1, the corresponding register's value will be retrieved.

 `regCount`
 [in] The number of register values to be retrieved.

 `regBuffer`
 [out] An array of `CORDB_REGISTER` objects, each of which receives the value of a register.

## Remarks

The `GetRegisters` method returns an array of values from the registers that are specified by the mask. The array does not contain values of registers whose mask bit is not set. Thus, the size of the `regBuffer` array must be equal to the number of 1's in the mask. If the value of `regCount` is too small for the number of registers indicated by the mask, the values of the higher numbered registers will be truncated from the set. If `regCount` is too large, the unused `regBuffer` elements will be unmodified.

If an unavailable register is indicated by the mask, an indeterminate value will be returned for that register.

The `ICorDebugRegisterSet2::GetRegisters` method is necessary for platforms that have more than 64 registers. For example, IA64 has 128 general purpose registers and 128 floating-point registers, so you need more than 64 bits in the bit mask.

If you don't have more than 64 registers, as is the case on platforms such as x86, the `GetRegisters` method just translates the bytes in the `mask` byte array into a `ULONG64` and then calls the ICorDebugRegisterSet::GetRegisters method, which takes the `ULONG64` mask.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugRegisterSet2 Interface
- ICorDebugRegisterSet Interface
