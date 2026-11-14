---
title: "ICorDebugThread2::InterceptCurrentException Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-interceptcurrentexception-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread2::InterceptCurrentException Method

Allows a debugger to intercept the current exception on this thread.

## Syntax

```cpp
HRESULT InterceptCurrentException (
    [in] ICorDebugFrame  *pFrame
);
```

## Parameters

 `pFrame`
 [in] A pointer to an ICorDebugFrame that represents the active stack frame.

## Remarks

The `InterceptCurrentException` method can be called between an exception callback (ICorDebugManagedCallback::Exception or ICorDebugManagedCallback2::Exception) and the associated call to ICorDebugController::Continue.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
