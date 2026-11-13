---
title: "ICorDebugThread2::InterceptCurrentException Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-interceptcurrentexception-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
