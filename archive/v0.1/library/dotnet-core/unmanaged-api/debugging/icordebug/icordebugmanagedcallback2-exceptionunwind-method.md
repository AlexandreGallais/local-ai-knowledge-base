---
title: "ICorDebugManagedCallback2::ExceptionUnwind Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-exceptionunwind-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2::ExceptionUnwind Method

Provides a status notification during the exception unwinding process.

## Syntax

```cpp
HRESULT ExceptionUnwind (
    [in] ICorDebugAppDomain                  *pAppDomain,
    [in] ICorDebugThread                     *pThread,
    [in] CorDebugExceptionUnwindCallbackType  dwEventType,
    [in] DWORD                                dwFlags
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the thread on which the exception was thrown.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread on which the exception was thrown.

 `dwEventType`
 [in] A value of the CorDebugExceptionUnwindCallbackType enumeration that specifies the event that is being signaled by the callback during the unwind phase.

 `dwFlags`
 [in] A value of the CorDebugExceptionFlags enumeration that specifies additional information about the exception.

## Remarks

 `ExceptionUnwind` is called at various points during the unwind phase of the exception-handling process. `ExceptionUnwind` can be called more than once while unwinding a single exception.

If `dwEventType` = DEBUG_EXCEPTION_INTERCEPTED, the instruction pointer will be in the leaf frame of the thread, at the sequence point before (this may be several instructions before) the instruction that led to the exception.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugManagedCallback2 Interface
- ICorDebugManagedCallback Interface
