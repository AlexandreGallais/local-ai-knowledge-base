---
title: "ICorDebugThread::GetDebugState Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getdebugstate-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetDebugState Method

Gets the current debug state of this ICorDebugThread object.

## Syntax

```cpp
HRESULT GetDebugState (
    [out] CorDebugThreadState   *pState
);
```

## Parameters

 `pState`
 [out] A pointer to a bitwise combination of CorDebugThreadState enumeration values that describes the current debug state of this thread.

## Remarks

If the process is currently stopped, `pState` represents the debug state that would exist for this thread if the process were to be continued, not the actual current state of this thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
