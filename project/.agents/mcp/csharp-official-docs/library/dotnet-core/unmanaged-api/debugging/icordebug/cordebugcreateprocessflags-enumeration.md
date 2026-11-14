---
title: "CorDebugCreateProcessFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugcreateprocessflags-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugCreateProcessFlags Enumeration

Provides additional debugging options that can be used in a call to the ICorDebug::CreateProcess method.

## Syntax

```cpp
typedef enum CorDebugCreateProcessFlags {
    DEBUG_NO_SPECIAL_OPTIONS    = 0x0000
} CorDebugCreateProcessFlags;
```

## Members

| Member                     | Description                 |
|----------------------------|-----------------------------|
| `DEBUG_NO_SPECIAL_OPTIONS` | No special options are set. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
