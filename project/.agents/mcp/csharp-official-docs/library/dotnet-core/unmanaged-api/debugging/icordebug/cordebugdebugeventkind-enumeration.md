---
title: "CorDebugDebugEventKind Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugdebugeventkind-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugDebugEventKind Enumeration

Indicates the type of event whose information is decoded by the DecodeEvent method.

## Syntax

```cpp
typedef enum CorDebugDebugEventKind {
    DEBUG_EVENT_KIND_MODULE_LOADED                          = 1,
    DEBUG_EVENT_KIND_MODULE_UNLOADED                        = 2,
    DEBUG_EVENT_KIND_MANAGED_EXCEPTION_FIRST_CHANCE         = 3,
    DEBUG_EVENT_KIND_MANAGED_EXCEPTION_USER_FIRST_CHANCE    = 4,
    DEBUG_EVENT_KIND_MANAGED_EXCEPTION_CATCH_HANDLER_FOUND  = 5,
    DEBUG_EVENT_KIND_MANAGED_EXCEPTION_UNHANDLED            = 6
} CorDebugRecordFormat;
```

## Members

| Member                                                 | Description                    |
|--------------------------------------------------------|--------------------------------|
| `DEBUG_EVENT_KIND_MODULE_LOADED`                       | A module load event.           |
| `DEBUG_EVENT_KIND_MODULE_UNLOADED`                     | A module unload event.         |
| `DEBUG_EVENT_KIND_MANAGED_EXCEPTION_FIRST_CHANCE`      | A first-chance exception.      |
| `DEBUG_EVENT_KIND_MANAGED_EXCEPTION_USER_FIRST_CHANCE` | A first-chance user exception. |
|`DEBUG_EVENT_KIND_MANAGED_EXCEPTION_CATCH_HANDLER_FOUND`|An exception for which a `catch` handler exists.|
|`DEBUG_EVENT_KIND_MANAGED_EXCEPTION_UNHANDLED`|An unhandled exception.|

## Remarks

 A member of the `CorDebugDebugEventKind` enumeration is returned by calling the ICorDebugDebugEvent::GetEventKind method.

> **Note:**
> This enumeration is intended for use in .NET Native debugging scenarios only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
