---
title: "ICorDebugBreakpoint::IsActive Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugbreakpoint-isactive-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugBreakpoint::IsActive Method

Gets a value that indicates whether this `ICorDebugBreakpoint` is active.

## Syntax

```cpp
HRESULT IsActive (
    [out] BOOL *pbActive
);
```

## Parameters

 `pbActive`
 [out] `true` if this breakpoint is active; otherwise, `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
