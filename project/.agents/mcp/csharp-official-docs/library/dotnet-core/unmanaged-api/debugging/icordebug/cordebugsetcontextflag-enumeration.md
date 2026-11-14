---
title: "CorDebugSetContextFlag Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugsetcontextflag-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugSetContextFlag Enumeration

Indicates whether the context is from the active (or leaf) frame on the stack or has been computed by unwinding from another frame.

## Syntax

```cpp
typedef enum CorDebugSetContextFlag
{
   SET_CONTEXT_FLAG_ACTIVE_FRAME = 1
   SET_CONTEXT_FLAG_UNWIND_FRAME = 2
}  CorDebugSetContextFlag;
```

## Members

|Member|Description|
|------------|-----------------|
|SET_CONTEXT_FLAG_ACTIVE_FRAME|The context is the thread’s active context.|
|SET_CONTEXT_FLAG_UNWIND_FRAME|The context has been computed by unwinding from another frame.|

## Remarks

 `CorDebugSetContextFlag` provides values that are used by the ICorDebugStackWalk::SetContext method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
