---
title: "CorDebugExceptionCallbackType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugexceptioncallbacktype-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugExceptionCallbackType Enumeration

Indicates the type of callback that is made from an ICorDebugManagedCallback2::Exception event.

## Syntax

```cpp
typedef enum CorDebugExceptionCallbackType {
    DEBUG_EXCEPTION_FIRST_CHANCE         = 1,
    DEBUG_EXCEPTION_USER_FIRST_CHANCE    = 2,
    DEBUG_EXCEPTION_CATCH_HANDLER_FOUND  = 3,
    DEBUG_EXCEPTION_UNHANDLED            = 4
} CorDebugExceptionCallbackType;
```

## Members

| Member                              | Description                                     |
|-------------------------------------|-------------------------------------------------|
| `DEBUG_EXCEPTION_FIRST_CHANCE`      | An exception was thrown.                        |
| `DEBUG_EXCEPTION_USER_FIRST_CHANCE` | The exception windup process entered user code. |
| `DEBUG_EXCEPTION_CATCH_HANDLER_FOUND` | The exception windup process found a `catch` block in user code. |
| `DEBUG_EXCEPTION_UNHANDLED`         | The exception was not handled. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
