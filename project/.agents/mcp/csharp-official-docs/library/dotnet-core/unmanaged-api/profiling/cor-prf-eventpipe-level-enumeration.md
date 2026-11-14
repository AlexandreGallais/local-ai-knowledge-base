---
title: "COR_PRF_EVENTPIPE_LEVEL Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/cor-prf-eventpipe-level-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# COR_PRF_EVENTPIPE_LEVEL enumeration

Describes the level of an EventPipe event.

## Syntax

```cpp
typedef enum
{
    COR_PRF_EVENTPIPE_LOGALWAYS = 0,
    COR_PRF_EVENTPIPE_CRITICAL = 1,
    COR_PRF_EVENTPIPE_ERROR = 2,
    COR_PRF_EVENTPIPE_WARNING = 3,
    COR_PRF_EVENTPIPE_INFORMATIONAL = 4,
    COR_PRF_EVENTPIPE_VERBOSE = 5
} COR_PRF_EVENTPIPE_LEVEL;
```

## Members

| Member | Description |
|------------|-----------------|
| `COR_PRF_EVENTPIPE_LOGALWAYS` | The event is always logged. |
| `COR_PRF_EVENTPIPE_CRITICAL` | The event represents a critical message. |
| `COR_PRF_EVENTPIPE_ERROR` | The event represents an error message. |
| `COR_PRF_EVENTPIPE_WARNING` | The event represents a warning message. |
| `COR_PRF_EVENTPIPE_INFORMATIONAL` | The event represents an informational message. |
| `COR_PRF_EVENTPIPE_VERBOSE` | The event represents a verbose message. |

## Remarks

 The `COR_PRF_EVENTPIPE_LEVEL` enumeration is used by the ICorProfilerInfo12::EventPipeDefineEvent method to indicate the level of the event being defined.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerInfo12::EventPipeDefineEvent
