---
title: "CorDebugExceptionUnwindCallbackType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugexceptionunwindcallbacktype-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugExceptionUnwindCallbackType Enumeration

Indicates the event that is being signaled by the callback during the unwind phase.

## Syntax

```cpp
typedef enum CorDebugExceptionUnwindCallbackType {
    DEBUG_EXCEPTION_UNWIND_BEGIN = 1,
    DEBUG_EXCEPTION_INTERCEPTED  = 2
} CorDebugExceptionUnwindCallbackType;
```

## Members

|Member|Description|
|------------|-----------------|
|`DEBUG_EXCEPTION_UNWIND_BEGIN`|The beginning of the unwind process.|
|`DEBUG_EXCEPTION_INTERCEPTED`|The exception was intercepted.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
