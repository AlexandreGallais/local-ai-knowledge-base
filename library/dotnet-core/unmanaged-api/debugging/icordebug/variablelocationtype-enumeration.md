---
title: "VariableLocationType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/variablelocationtype-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
