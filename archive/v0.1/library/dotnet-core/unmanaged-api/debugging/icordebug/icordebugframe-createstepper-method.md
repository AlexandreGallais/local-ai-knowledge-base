---
title: "ICorDebugFrame::CreateStepper Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-createstepper-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFrame::CreateStepper Method

Gets a stepper that allows the debugger to perform stepping operations relative to this ICorDebugFrame.

## Syntax

```cpp
HRESULT CreateStepper (
    [out] ICorDebugStepper   **ppStepper
);
```

## Parameters

 `ppStepper`
 [out] A pointer to the address of an ICorDebugStepper object that allows the debugger to perform stepping operations relative to the current frame.

## Remarks

If the frame is not active, the stepper object will typically have to return to the frame before the step is completed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
