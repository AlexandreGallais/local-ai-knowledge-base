---
title: "ICorDebugStepper::StepRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-steprange-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStepper::StepRange Method

Causes this ICorDebugStepper to single-step through its containing thread, and to return when it reaches code beyond the last of the specified ranges.

## Syntax

```cpp
HRESULT StepRange (
    [in] BOOL     bStepIn,
    [in, size_is(cRangeCount)] COR_DEBUG_STEP_RANGE ranges[],
    [in] ULONG32  cRangeCount
);
```

## Parameters

 `bStepIn`
 [in] Set to `true` to step into a function that is called within the thread. Set to `false` to step over the function.

 `ranges`
 [in] An array of COR_DEBUG_STEP_RANGE structures, each of which specifies a range.

 `cRangeCount`
 [in] The size of the `ranges` array.

## Remarks

The `StepRange` method works like the ICorDebugStepper::Step method, except that it does not complete until code outside the given range is reached.

This can be more efficient than stepping one instruction at a time. Ranges are specified as a list of offset pairs from the start of the stepper's frame.

Ranges are relative to the common intermediate language (CIL) code of a method. Call ICorDebugStepper::SetRangeIL with `false` to make the ranges relative to the native code of a method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
