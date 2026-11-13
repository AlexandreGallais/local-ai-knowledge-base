---
title: "ICorDebugProcess::ClearCurrentException Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-clearcurrentexception-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess::ClearCurrentException Method

Clears the current unmanaged exception on the given thread.

## Syntax

```cpp
HRESULT ClearCurrentException([in] DWORD threadID);
```

## Parameters

 `threadID`
 [in] The ID of the thread on which the current unmanaged exception will be cleared.

## Remarks

Call this method before calling ICorDebugController::Continue when a thread has reported an unmanaged exception that should be ignored by the debuggee. This will clear both the outstanding in-band (IB) and out-of-band (OOB) events on the given thread. All OOB breakpoints and single-step exceptions are automatically cleared.

Use ICorDebugThread2::InterceptCurrentException to intercept the current managed exception on a thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
