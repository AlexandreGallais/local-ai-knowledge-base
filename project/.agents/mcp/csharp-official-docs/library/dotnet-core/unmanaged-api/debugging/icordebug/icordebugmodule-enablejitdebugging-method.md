---
title: "ICorDebugModule::EnableJITDebugging Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-enablejitdebugging-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule::EnableJITDebugging Method

Controls whether the just-in-time (JIT) compiler preserves debugging information for methods within this module.

## Syntax

```cpp
HRESULT EnableJITDebugging(
    [in] BOOL bTrackJITInfo,
    [in] BOOL bAllowJitOpts
);
```

## Parameters

 `bTrackJITInfo`
 [in] Set this value to `true` to enable the JIT compiler to preserve mapping information between the common intermediate language (CIL) version and the JIT-compiled version of each method in this module.

 `bAllowJitOpts`
 [in] Set this value to `true` to enable the JIT compiler to generate code with certain JIT-specific optimizations for debugging.

## Remarks

JIT debugging is enabled by default for all modules that are loaded when the debugger is active. Programmatically enabling or disabling the settings overrides global settings.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
