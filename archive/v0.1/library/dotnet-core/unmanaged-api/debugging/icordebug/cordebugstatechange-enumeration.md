---
title: "CorDebugStateChange Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugstatechange-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugStateChange Enumeration

Describes the amount of cached data that must be discarded based on changes to the process.

## Syntax

```cpp
typedef enum CorDebugStateChange
{
    PROCESS_RUNNING = 0x0000001,
    FLUSH_ALL       = 0x0000002,
} CorDebugStateChange;
```

## Members

| Member            | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `PROCESS_RUNNING` | The process reached a new memory state via forward execution.            |
| `FLUSH_ALL`       | The process' memory may be arbitrarily different than it was previously. |

## Remarks

 A member of the `CorDebugStateChange` enumeration is provided as an argument when the debugger calls the `ProcessStateChanged` method either with ICorDebugProcess4::ProcessStateChanged or ICorDebugProcess6::ProcessStateChanged.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
