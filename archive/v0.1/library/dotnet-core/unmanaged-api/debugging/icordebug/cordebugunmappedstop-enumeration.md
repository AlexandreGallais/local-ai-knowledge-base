---
title: "CorDebugUnmappedStop Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugunmappedstop-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugUnmappedStop Enumeration

Specifies the type of unmapped code that can trigger a halt in code execution by the stepper.

## Syntax

```cpp
typedef enum CorDebugUnmappedStop {
    STOP_NONE               = 0x0,
    STOP_PROLOG             = 0x01,
    STOP_EPILOG             = 0x02,
    STOP_NO_MAPPING_INFO    = 0x04,
    STOP_OTHER_UNMAPPED     = 0x08,
    STOP_UNMANAGED          = 0x10,
    STOP_ALL                = 0xffff,
} CorDebugUnmappedStop;
```

## Members

|Member|Description|
|------------|-----------------|
|`STOP_NONE`|Do not stop in any type of unmapped code.|
|`STOP_PROLOG`|Stop in prolog code.|
|`STOP_EPILOG`|Stop in epilog code.|
|`STOP_NO_MAPPING_INFO`|Stop in code that has no mapping information.|
|`STOP_OTHER_UNMAPPED`|Stop in unmapped code that does not fit into the prolog, epilog, no-mapping-information, or unmanaged category.|
|`STOP_UNMANAGED`|Stop in unmanaged code. This value is valid only with interop debugging.|
|`STOP_ALL`|Stop in all types of unmapped code.|

## Remarks

 Use the ICorDebugStepper::SetUnmappedStopMask method to set the flags that specify the unmapped code in which the stepper will stop.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
