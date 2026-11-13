---
title: "ICorDebugAppDomain::EnumerateSteppers Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-enumeratesteppers-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
