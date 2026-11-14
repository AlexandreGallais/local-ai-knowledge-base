---
title: "ICorDebugVariableHome::GetRegister Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getregister-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHome::GetRegister Method

Gets the register that contains a variable with a location type of `VLT_REGISTER`, and the base register for a variable with a location type of `VLT_REGISTER_RELATIVE`.

## Syntax

```cpp
HRESULT GetRegister(
    [out] CorDebugRegister *pRegister
);
```

## Parameters

 `pRegister`\
 [out] A CorDebugRegister enumeration value that indicates the register for a variable with a location type of `VLT_REGISTER`, and the base register for a variable with a location type of `VLT_REGISTER_RELATIVE`.

## Return Value

The method returns the following values:

| Value    | Description                                                            |
|----------|------------------------------------------------------------------------|
| `S_OK`   | The variable is in the register indicated by the `pRegister` argument. |
| `E_FAIL` | The variable is not in a register or a register-relative location.     |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome interface
