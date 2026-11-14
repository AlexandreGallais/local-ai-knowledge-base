---
title: "ICorDebugAppDomain::EnumerateBreakpoints Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-enumeratebreakpoints-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
