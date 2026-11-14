---
title: "ICorDebugThread::GetUserState Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getuserstate-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetUserState Method

Gets the current user state of this ICorDebugThread.

## Syntax

```cpp
HRESULT GetUserState (
    [out] CorDebugUserState   *pState
);
```

## Parameters

 `pState`
 [out] A pointer to a bitwise combination of CorDebugUserState enumeration values that describe the current user state of this thread.

## Remarks

The user state of the thread is the state of the thread when it is examined by the program that is being debugged. A thread may have multiple state bits set.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
