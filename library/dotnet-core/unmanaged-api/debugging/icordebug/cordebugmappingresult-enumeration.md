---
title: "CorDebugMappingResult Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugmappingresult-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugMappingResult Enumeration

Provides the details of how the value of the instruction pointer (IP) was obtained.

## Syntax

```cpp
typedef enum CorDebugMappingResult {
    MAPPING_PROLOG              = 0x1,
    MAPPING_EPILOG              = 0x2,
    MAPPING_NO_INFO             = 0x4,
    MAPPING_UNMAPPED_ADDRESS    = 0x8,
    MAPPING_EXACT               = 0x10,
    MAPPING_APPROXIMATE         = 0x20,
} CorDebugMappingResult;
```

## Members

|Member|Description|
|------------|-----------------|
|`MAPPING_PROLOG`|The native code is in the prolog, so the value of the IP is 0.|
|`MAPPING_EPILOG`|The native code is in an epilog, so the value of the IP is the address of the last instruction of the method.|
|`MAPPING_NO_INFO`|No mapping information is available for the method, so the value of the IP is 0.|
|`MAPPING_UNMAPPED_ADDRESS`|Although there is mapping information for the method, the current address cannot be mapped to common intermediate language (CIL) code. The value of the IP is 0.|
|`MAPPING_EXACT`|Either the method maps exactly to CIL code or the frame has been interpreted, so the value of the IP is accurate.|
|`MAPPING_APPROXIMATE`|The method was successfully mapped, but the value of the IP may be approximate.|

## Remarks

 You can use the ICorDebugILFrame::GetIP method to obtain the value of the instruction pointer.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
