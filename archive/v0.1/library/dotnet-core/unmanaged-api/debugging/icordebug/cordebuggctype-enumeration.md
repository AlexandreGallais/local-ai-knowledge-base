---
title: "CorDebugGCType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebuggctype-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
