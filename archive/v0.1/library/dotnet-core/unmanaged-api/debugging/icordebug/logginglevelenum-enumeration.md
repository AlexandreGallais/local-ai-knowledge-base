---
title: "LoggingLevelEnum Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/logginglevelenum-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# LoggingLevelEnum Enumeration

Indicates the severity level of a descriptive message that is written to the event log when a managed thread logs an event.

## Syntax

```cpp
typedef enum LoggingLevelEnum {
    LTraceLevel0 = 0,
    LTraceLevel1,
    LTraceLevel2,
    LTraceLevel3,
    LTraceLevel4,
    LStatusLevel0 = 20,
    LStatusLevel1,
    LStatusLevel2,
    LStatusLevel3,
    LStatusLevel4,
    LWarningLevel = 40,
    LErrorLevel = 50,
    LPanicLevel = 100
} LoggingLevelEnum;
```

## Members

| Member          | Description                      |
|-----------------|----------------------------------|
| `LTraceLevel0`  | The message is a trace level 0.  |
| `LTraceLevel1`  | The message is a trace level 1.  |
| `LTraceLevel2`  | The message is a trace level 2.  |
| `LTraceLevel3`  | The message is a trace level 3.  |
| `LTraceLevel4`  | The message is a trace level 4.  |
| `LStatusLevel0` | The message is a status level 0. |
| `LStatusLevel1` | The message is a status level 1. |
| `LStatusLevel2` | The message is a status level 2. |
| `LStatusLevel3` | The message is a status level 3. |
| `LStatusLevel4` | The message is a status level 4. |
| `LWarningLevel` | The message is a warning level.  |
| `LErrorLevel`   | The message is an error level.   |
| `LPanicLevel`   | The message is a panic level.    |

## Remarks

 The common language runtime (CLR) calls the ICorDebugManagedCallback::LogMessage method to notify the debugger that a managed thread has logged an event. The CLR passes a value of the `LoggingLevelEnum` enumeration to indicate the severity level of the message that the managed thread wrote to the event log.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- `System.Diagnostics.EventLog`
