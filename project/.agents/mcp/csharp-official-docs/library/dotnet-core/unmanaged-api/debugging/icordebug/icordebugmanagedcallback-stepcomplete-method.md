---
title: "ICorDebugManagedCallback::StepComplete Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-stepcomplete-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::StepComplete Method

Notifies the debugger that a step has completed.

## Syntax

```cpp
HRESULT StepComplete (
    [in] ICorDebugAppDomain  *pAppDomain,
    [in] ICorDebugThread     *pThread,
    [in] ICorDebugStepper    *pStepper,
    [in] CorDebugStepReason   reason
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the thread in which the step has completed.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread in which the step has completed.

 `pStepper`
 [in] A pointer to an ICorDebugStepper object that represents the step in code execution.

 `reason`
 [in] A value of the CorDebugStepReason enumeration that indicates the outcome of an individual step.

## Remarks

The stepper may be used to continue stepping if desired, unless the debugging is terminated.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
