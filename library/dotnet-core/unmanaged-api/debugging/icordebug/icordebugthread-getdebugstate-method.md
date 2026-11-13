---
title: "ICorDebugThread::GetDebugState Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getdebugstate-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
