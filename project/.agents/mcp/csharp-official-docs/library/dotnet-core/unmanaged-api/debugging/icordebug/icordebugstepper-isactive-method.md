---
title: "ICorDebugStepper::IsActive Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-isactive-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStepper::IsActive Method

Gets a value that indicates whether this ICorDebugStepper is currently executing a step.

## Syntax

```cpp
HRESULT IsActive (
    [out] BOOL   *pbActive
);
```

## Parameters

 `pbActive`
 [out] Returns `true` if the stepper is currently executing a step; otherwise, returns `false`.

## Remarks

Any step action remains active until the debugger receives a ICorDebugManagedCallback::StepComplete call, which automatically deactivates the stepper. A stepper may also be deactivated prematurely by calling ICorDebugStepper::Deactivate before the callback condition is reached.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
