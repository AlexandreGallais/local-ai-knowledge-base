---
title: "ICorDebugManagedCallback2::Exception Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-exception-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2::Exception Method

Notifies the debugger that a search for an exception handler has started.

## Syntax

```cpp
HRESULT Exception (
    [in] ICorDebugAppDomain   *pAppDomain,
    [in] ICorDebugThread      *pThread,
    [in] ICorDebugFrame       *pFrame,
    [in] ULONG32              nOffset,
    [in] CorDebugExceptionCallbackType dwEventType,
    [in] DWORD                dwFlags
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the thread on which the exception was thrown.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread on which the exception was thrown.

 `pFrame`
 [in] A pointer to an ICorDebugFrame object that represents a frame, as determined by the `dwEventType` parameter. For more information, see the table in the Remarks section.

 `nOffset`
 [in] An integer that specifies an offset, as determined by the `dwEventType` parameter. For more information, see the table in the Remarks section.

 `dwEventType`
 [in] A value of the CorDebugExceptionCallbackType enumeration that specifies the type of this exception callback.

 `dwFlags`
 [in] A value of the CorDebugExceptionFlags enumeration that specifies additional information about the exception

## Remarks

The `Exception` callback is called at various points during the search phase of the exception-handling process. That is, it can be called more than once while unwinding an exception.

The exception being processed can be retrieved from the ICorDebugThread object referenced by the `pThread` parameter.

The particular frame and offset are determined by the `dwEventType` parameter as follows:

|Value of `dwEventType`|Value of `pFrame`|Value of `nOffset`|
|----------------------------|-----------------------|------------------------|
|DEBUG_EXCEPTION_FIRST_CHANCE|The frame that threw the exception.|The instruction pointer in the frame.|
|DEBUG_EXCEPTION_USER_FIRST_CHANCE|The user-code frame closest to the point of the thrown exception.|The instruction pointer in the frame.|
|DEBUG_EXCEPTION_CATCH_HANDLER_FOUND|The frame that contains the catch handler.|The common intermediate language (CIL) offset of the beginning of the catch handler.|
|DEBUG_EXCEPTION_UNHANDLED|NULL|Undefined.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugManagedCallback2 Interface
- ICorDebugManagedCallback Interface
