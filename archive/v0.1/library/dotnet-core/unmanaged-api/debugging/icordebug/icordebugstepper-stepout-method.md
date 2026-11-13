---
title: "ICorDebugStepper::StepOut Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-stepout-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStepper::StepOut Method

Causes this `ICorDebugStepper` to single-step through its containing thread, and to complete when the current frame returns control to the calling frame.

## Syntax

```cpp
HRESULT StepOut ();
```

## Remarks

A `StepOut` operation will complete after returning normally from the current frame to the calling frame.

If `StepOut` is called when in unmanaged code, the step will complete when the current frame returns to the managed code that called it.

Do not use `StepOut` with the `STOP_UNMANAGED` flag set because it will fail. (Use ICorDebugStepper::SetUnmappedStopMask to set flags for stepping.) Interop debuggers must step out to native code themselves.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
