---
title: "ICorDebugValueBreakpoint::GetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvaluebreakpoint-getvalue-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
