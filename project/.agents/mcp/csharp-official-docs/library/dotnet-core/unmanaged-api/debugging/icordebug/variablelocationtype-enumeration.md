---
title: "VariableLocationType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/variablelocationtype-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# VariableLocationType Enumeration

Indicates the native location type of a variable.

## Syntax

```cpp
typedef enum VariableLocationType
{
    VLT_REGISTER,
    VLT_REGISTER_RELATIVE,
    VLT_INVALID
} VariableLocationType;
```

## Members

| Member                  | Description                                                                      |
|-------------------------|----------------------------------------------------------------------------------|
| `VLT_REGISTER`          | The variable is in a register.                                                   |
| `VLT_REGISTER_RELATIVE` | The variable is in a register-relative memory location.                          |
| `VLT_INVALID`           | The variable is not stored in a register or a register-relative memory location. |

## Remarks

 A member of the `VariableLocationType` enumeration is returned by the ICorDebugVariableHome::GetLocationType method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2
