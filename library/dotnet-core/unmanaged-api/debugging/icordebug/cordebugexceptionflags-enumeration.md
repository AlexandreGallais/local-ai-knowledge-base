---
title: "CorDebugExceptionFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugexceptionflags-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugExceptionFlags Enumeration

Provides additional information about an exception.

## Syntax

```cpp
typedef enum CorDebugExceptionFlags {
    DEBUG_EXCEPTION_NONE = 0,
    DEBUG_EXCEPTION_CAN_BE_INTERCEPTED = 0x0001
} CorDebugExceptionFlags;
```

## Members

| Member                 | Description            |
|------------------------|------------------------|
| `DEBUG_EXCEPTION_NONE` | There is no exception. |
|`DEBUG_EXCEPTION_CAN_BE_INTERCEPTED`|The exception is interceptable. The timing of the exception may still be such that the debugger cannot intercept it. For example, if there is no managed code below the current callback or the exception event resulted from a just-in-time (JIT) attachment, the exception cannot be intercepted.|

## Remarks

 New values may be added to this enumeration in later versions, so you should prepare code that uses `CorDebugExceptionFlags` for unexpected values.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
