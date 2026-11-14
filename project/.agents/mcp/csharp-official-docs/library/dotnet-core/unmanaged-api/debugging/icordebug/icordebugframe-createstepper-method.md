---
title: "ICorDebugFrame::CreateStepper Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-createstepper-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
