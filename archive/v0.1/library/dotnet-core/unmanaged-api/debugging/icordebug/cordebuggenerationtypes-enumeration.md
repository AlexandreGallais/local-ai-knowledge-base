---
title: "CorDebugGenerationTypes Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebuggenerationtypes-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugGenerationTypes Enumeration

Specifies the generation of a region of memory on the managed heap.

## Syntax

```cpp
typedef enum CorDebugGenerationTypes {
    CorDebug_Gen0 = 0,
    CorDebug_Gen1 = 1,
    CorDebug_Gen2 = 2,
    CorDebug_LOH  = 3,
} CorDebugRegionTypes;
```

## Members

|Member name|Description|
|-----------------|-----------------|
|`CorDebug_Gen0`|Generation 0.|
|`CorDebug_Gen1`|Generation 1.|
|`CorDebug_Gen2`|Generation 2.|
|`CorDebug_LOH`|The large object heap.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
