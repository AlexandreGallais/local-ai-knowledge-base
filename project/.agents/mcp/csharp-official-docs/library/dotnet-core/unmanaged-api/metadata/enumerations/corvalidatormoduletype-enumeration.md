---
title: "CorValidatorModuleType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/enumerations/corvalidatormoduletype-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorValidatorModuleType Enumeration

Specifies the type of a module.

## Syntax

```cpp
typedef enum
{
    ValidatorModuleTypeInvalid  = 0x0,
    ValidatorModuleTypeMin      = 0x00000001,
    ValidatorModuleTypePE       = 0x00000001,
    ValidatorModuleTypeObj      = 0x00000002,
    ValidatorModuleTypeEnc      = 0x00000003,
    ValidatorModuleTypeIncr     = 0x00000004,
    ValidatorModuleTypeMax      = 0x00000004
} CorValidatorModuleType;
```

## Members

| Member | Description |
|------------|-----------------|
| `ValidatorModuleTypeInvalid` | The module is an invalid type. |
| `ValidatorModuleTypeMin` | The minimum value of the `CorValidatorModuleType` enum. |
| `ValidatorModuleTypePE` | The module is a portable executable (PE) file. |
| `ValidatorModuleTypeObj` | The module is a .obj file. |
| `ValidatorModuleTypeEnc` |The module is an edit-and-continue debugger session.|
| `ValidatorModuleTypeIncr` | The module is one that has been incrementally built. |
| `ValidatorModuleTypeMax` | The maximum value of the `CorValidatorModuleType` enum. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h
