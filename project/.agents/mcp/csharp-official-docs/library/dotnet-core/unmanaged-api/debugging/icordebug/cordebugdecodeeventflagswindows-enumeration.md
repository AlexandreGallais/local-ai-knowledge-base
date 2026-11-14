---
title: "CorDebugDecodeEventFlagsWindows Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugdecodeeventflagswindows-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugDecodeEventFlagsWindows Enumeration

Provides additional information about debug events on the Windows platform.

## Syntax

```cpp
typedef enum CorDebugDecodeEventFlagsWindows {
    IS_FIRST_CHANCE = 1,
} CorDebugDecodeEventFlagsWindows;
```

## Members

| Member            | Description                                                 |
|-------------------|-------------------------------------------------------------|
| `IS_FIRST_CHANCE` | Indicates that the debug event is a first-chance exception. |

## Remarks

 The ICorDebugProcess6::DecodeEvent method includes a `dwFlags` parameter that provides additional information about a debug event and whose value is dependent on the target architecture. The `CorDebugDecodeEventFlagsWindows` enumeration can be used with debug events on the Windows platform.

> **Note:**
> This enumeration is intended for use in .NET Native debugging scenarios only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
