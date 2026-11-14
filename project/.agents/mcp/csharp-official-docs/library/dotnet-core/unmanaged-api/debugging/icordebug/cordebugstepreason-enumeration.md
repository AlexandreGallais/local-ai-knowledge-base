---
title: "CorDebugStepReason Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugstepreason-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugStepReason Enumeration

Indicates the outcome of an individual step.

## Syntax

```cpp
typedef enum CorDebugStepReason {
    STEP_NORMAL,
    STEP_RETURN,
    STEP_CALL,
    STEP_EXCEPTION_FILTER,
    STEP_EXCEPTION_HANDLER,
    STEP_INTERCEPT,
    STEP_EXIT
} CorDebugStepReason;
```

## Members

|Member|Description|
|------------|-----------------|
|`STEP_NORMAL`|Stepping completed normally, within the same function.|
|`STEP_RETURN`|Stepping continued normally, after the function returned.|
|`STEP_CALL`|Stepping continued normally, at the beginning of a newly called function.|
|`STEP_EXCEPTION_FILTER`|An exception was generated and control was passed to an exception filter.|
|`STEP_EXCEPTION_HANDLER`|An exception was generated and control was passed to an exception handler.|
|`STEP_INTERCEPT`|Control was passed to an interceptor.|
|`STEP_EXIT`|The thread exited before the step was completed.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- StepComplete Method
