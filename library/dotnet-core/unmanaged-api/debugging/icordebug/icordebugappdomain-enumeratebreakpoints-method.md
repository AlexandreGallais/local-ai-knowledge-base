---
title: "ICorDebugAppDomain::EnumerateBreakpoints Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-enumeratebreakpoints-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::EnumerateBreakpoints Method

Gets an enumerator for all active breakpoints in the application domain.

## Syntax

```cpp
HRESULT EnumerateBreakpoints (
    [out] ICorDebugBreakpointEnum   **ppBreakpoints
);
```

## Parameters

 `ppBreakpoints`
 [out] A pointer to the address of an ICorDebugBreakpointEnum object that is the enumerator for all active breakpoints in the application domain.

## Remarks

The enumerator includes all types of breakpoints, including function breakpoints and data breakpoints.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
