---
title: "ICorDebugStepper::SetUnmappedStopMask Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-setunmappedstopmask-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStepper::SetUnmappedStopMask Method

Sets a value that specifies the type of unmapped code in which execution will halt.

## Syntax

```cpp
HRESULT SetUnmappedStopMask (
    [in] CorDebugUnmappedStop   mask
);
```

## Parameters

 `mask`
 [in] A value of the CorDebugUnmappedStop enumeration that specifies the type of unmapped code in which the debugger will halt execution.

The default value is STOP_OTHER_UNMAPPED. The value STOP_UNMANAGED is only valid with interop debugging.

## Remarks

When the debugger finds a just-in-time (JIT) compilation that has no corresponding mapping to common intermediate language (CIL), it halts execution if the flag specifying that type of unmapped code has been set; otherwise, stepping transparently continues.

If the debugger doesn't use a stepper to enter a method, then it won't necessarily step over unmapped code.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
