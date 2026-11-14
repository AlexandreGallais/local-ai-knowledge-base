---
title: "CorDebugExceptionObjectStackFrame Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugexceptionobjectstackframe-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugExceptionObjectStackFrame Structure

Represents stack frame information from an exception object.

## Syntax

```cpp
typedef struct CorDebugExceptionObjectStackFrame {
    ICorDebugModule* pModule;
    CORDB_ADDRESS ip;
    mdMethodDef methodDef;
    BOOL isLastForeignExceptionFrame;
} CorDebugExceptionObjectStackFrame;
```

## Members

|Member|Description|
|------------|-----------------|
|`pModule`|A pointer to the ICorDebugModule object for the current frame.|
|`ip`|The value of the instruction pointer (EIP/RIP) for the current frame.|
|`methodDef`|The method token for the current frame.|
|`isLastForeignExceptionFrame`|A value that indicates whether the frame is the last frame in a foreign exception.|

## Remarks

 The caller must release the pointer to the ICorDebugModule object once it is no longer in use.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
