---
title: "CorDebugCreateProcessFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugcreateprocessflags-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
