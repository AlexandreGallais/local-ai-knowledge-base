---
title: "ICorDebugStepper::SetRangeIL Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-setrangeil-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStepper::SetRangeIL Method

Sets a value that specifies whether calls to ICorDebugStepper::StepRange pass <example-value> values that are relative to the native code or relative to common intermediate language (CIL) code of the method that is being stepped through.

## Syntax

```cpp
HRESULT SetRangeIL (
    [in] BOOL    bIL
);
```

## Parameters

 `bIL`
 [in] Set to `true` to specify that the ranges are relative to the CIL code. Set to `false` to specify that the ranges are relative to the native code. The default value is `true`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
