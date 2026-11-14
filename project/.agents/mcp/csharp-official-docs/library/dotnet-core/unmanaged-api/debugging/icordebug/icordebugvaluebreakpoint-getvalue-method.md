---
title: "ICorDebugValueBreakpoint::GetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvaluebreakpoint-getvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugValueBreakpoint::GetValue Method

Gets an interface pointer to an "ICorDebugValue" object that represents the value of the object on which the breakpoint is set.

## Syntax

```cpp
HRESULT GetValue (
    [out] ICorDebugValue   **ppValue
);
```

## Parameters

 `ppValue`
 [out] A pointer to the address of an `ICorDebugValue` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
