---
title: "CorDebugGenerationTypes Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebuggenerationtypes-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
