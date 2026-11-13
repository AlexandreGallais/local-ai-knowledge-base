---
title: "LogSwitchCallReason Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/logswitchcallreason-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# LogSwitchCallReason Enumeration

Indicates the operation that was performed on a debugging/tracing switch.

## Syntax

```cpp
typedef enum LogSwitchCallReason {
    SWITCH_CREATE,
    SWITCH_MODIFY,
    SWITCH_DELETE
} LogSwitchCallReason;
```

## Members

| Member          | Description                              |
|-----------------|------------------------------------------|
| `SWITCH_CREATE` | A debugging/tracing switch was created.  |
| `SWITCH_MODIFY` | A debugging/tracing switch was modified. |
| `SWITCH_DELETE` | A debugging/tracing switch was deleted.  |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
