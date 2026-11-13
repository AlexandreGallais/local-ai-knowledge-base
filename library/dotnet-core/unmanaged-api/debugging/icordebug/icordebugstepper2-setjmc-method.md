---
title: "ICorDebugStepper2::SetJMC Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper2-setjmc-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStepper2::SetJMC Method

Sets a value that specifies whether this ICorDebugStepper steps only through code that is authored by an application's developer. This process is also known as just my code (JMC) debugging.

## Syntax

```cpp
HRESULT SetJMC (
    [in] BOOL    fIsJMCStepper
);
```

## Parameters

 `fIsJMCStepper`
 [in] Set to `true` to step only through code that is authored by an application's developer; otherwise, set to `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
