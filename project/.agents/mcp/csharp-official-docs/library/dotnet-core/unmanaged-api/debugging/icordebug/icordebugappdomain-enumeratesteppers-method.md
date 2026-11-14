---
title: "ICorDebugAppDomain::EnumerateSteppers Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-enumeratesteppers-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::EnumerateSteppers Method

Gets an enumerator for all active steppers in the application domain.

## Syntax

```cpp
HRESULT EnumerateSteppers (
    [out] ICorDebugStepperEnum   **ppSteppers
);
```

## Parameters

 `ppSteppers`
 [out] A pointer to the address of an ICorDebugStepperEnum object that is the enumerator for all active steppers in the application domain.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
