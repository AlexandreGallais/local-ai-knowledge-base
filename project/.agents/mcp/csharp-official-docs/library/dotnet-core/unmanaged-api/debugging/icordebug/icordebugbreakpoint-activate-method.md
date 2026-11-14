---
title: "ICorDebugBreakpoint::Activate Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugbreakpoint-activate-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
