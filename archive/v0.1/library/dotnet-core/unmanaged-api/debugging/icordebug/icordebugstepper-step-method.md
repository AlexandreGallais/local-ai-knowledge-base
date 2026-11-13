---
title: "ICorDebugStepper::Step Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-step-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStepper::Step Method

Causes this ICorDebugStepper to single-step through its containing thread, and optionally, to continue single-stepping through functions that are called within the thread.

## Syntax

```cpp
HRESULT Step (
    [in] BOOL   bStepIn
);
```

## Parameters

 `bStepIn`
 [in] Set to `true` to step into a function that is called within the thread. Set to `false` to step over the function.

## Remarks

The step completes when the common language runtime performs the next managed instruction in this stepper's frame. If `Step` is called on a stepper, which is not in managed code, the step will complete when the next managed code instruction is executed by the thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
