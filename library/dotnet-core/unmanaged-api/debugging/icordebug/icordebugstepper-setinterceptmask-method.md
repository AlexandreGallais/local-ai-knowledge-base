---
title: "ICorDebugStepper::SetInterceptMask Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-setinterceptmask-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStepper::SetInterceptMask Method

Sets a value that specifies the types of code that are stepped into.

## Syntax

```cpp
HRESULT SetInterceptMask (
    [in] CorDebugIntercept    mask
);
```

## Parameters

 `mask`
 [in] A combination of values of the CorDebugIntercept enumeration that specifies the types of code.

## Remarks

If the bit for an interceptor is set, the stepper will complete when the given type of intercepting code is encountered. If the bit is cleared, the intercepting code will be skipped.

The `SetInterceptMask` method may have unforeseen interactions with ICorDebugStepper::SetUnmappedStopMask (from the user's point of view). For example, if the only visible (that is, non-internal) portion of class initialization code lacks mapping information and STOP_NO_MAPPING_INFO isn't set (see the ICorDebugStepper::SetUnmappedStopMask method and the CorDebugUnmappedStop enumeration), the stepper will step over the class initialization. By default, only the INTERCEPT_NONE value of the `CorDebugIntercept` enumeration will be used.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
