---
title: "ICorDebugBreakpoint::Activate Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugbreakpoint-activate-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugBreakpoint::Activate Method

Sets the active state of this `ICorDebugBreakpoint`.

## Syntax

```cpp
HRESULT Activate (
    [in] BOOL bActive
);
```

## Parameters

 `bActive`
 [in] Set this value to `true` to specify the state as active; otherwise, set this value to `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
