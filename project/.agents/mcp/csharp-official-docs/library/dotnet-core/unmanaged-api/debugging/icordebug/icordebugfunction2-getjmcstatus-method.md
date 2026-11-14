---
title: "ICorDebugFunction2::GetJMCStatus Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction2-getjmcstatus-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunction2::GetJMCStatus Method

Gets a value that indicates whether the function that is represented by this ICorDebugFunction2 object is marked as user code.

## Syntax

```cpp
HRESULT GetJMCStatus (
    [out] BOOL   *pbIsJustMyCode
);
```

## Parameters

 `pbIsJustMyCode`
 [out] A pointer to a Boolean value that is `true`, if this function is marked as user code; otherwise, the value is `false`.

## Remarks

If the function represented by this `ICorDebugFunction2` cannot be debugged, `pbIsJustMyCode` will always be `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
