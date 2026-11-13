---
title: "CorDebugDecodeEventFlagsWindows Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugdecodeeventflagswindows-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
