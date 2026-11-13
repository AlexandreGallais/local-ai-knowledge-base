---
title: "ICorDebugThread::GetCurrentException Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getcurrentexception-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetCurrentException Method

Gets an interface pointer to an ICorDebugValue object that represents an exception that is currently being thrown by managed code.

## Syntax

```cpp
HRESULT GetCurrentException (
    [out] ICorDebugValue **ppExceptionObject
);
```

## Parameters

 `ppExceptionObject`
 [out] A pointer to the address of an `ICorDebugValue` object that represents the exception that is currently being thrown by managed code.

## Remarks

The exception object will exist from the time the exception is thrown until the end of the `catch` block. A function evaluation, which is performed by the ICorDebugEval methods, will clear out the exception object on setup and restore it on completion.

Exceptions can be nested (for example, if an exception is thrown in a filter or in a function evaluation), so there may be multiple outstanding exceptions on a single thread. `GetCurrentException` returns the most current exception.

The exception object and type may change throughout the life of the exception. For example, after an exception of type x is thrown, the common language runtime (CLR) may run out of memory and promote it to an out-of-memory exception.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
