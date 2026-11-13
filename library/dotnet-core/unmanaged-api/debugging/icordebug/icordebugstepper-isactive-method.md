---
title: "ICorDebugStepper::IsActive Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-isactive-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
