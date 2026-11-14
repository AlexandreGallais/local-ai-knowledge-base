---
title: "CorDebugGCType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebuggctype-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugGCType Enumeration

Indicates whether the garbage collector is running on a workstation or a server.

## Syntax

```cpp
typedef enum CorDebugGCType {
    CorDebugWorkstationGC  = 0,
    CorDebugServerGC       = ( CorDebugWorkstationGC + 1 )
} CorDebugGCType;
```

## Members

|Member name|Description|
|-----------------|-----------------|
|`CorDebugWorkstationGC`|The garbage collector is running on a workstation.|
|`CorDebugServerGC`|The garbage collector is running on a server.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
