---
title: "ICorDebugManagedCallback::DebuggerError Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-debuggererror-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::DebuggerError Method

Notifies the debugger that an error has occurred while attempting to handle an event from the common language runtime (CLR).

## Syntax

```cpp
HRESULT DebuggerError (
    [in] ICorDebugProcess *pProcess,
    [in] HRESULT           errorHR,
    [in] DWORD             errorCode
);
```

## Parameters

 `pProcess`
 [in] A pointer to an "ICorDebugProcess" object that represents the process in which the event occurred.

 `errorHR`
 [in] The HRESULT value that was returned from the event handler.

 `errorCode`
 [in] An integer that specifies the CLR error.

## Remarks

The process may be placed into pass-through mode, depending on the nature of the error.

The `DebugError` callback indicates that debugging services have been disabled due to an error, so debuggers should make the error message available to the user. ICorDebugProcess::GetID will be safe to call, but all other methods, including ICorDebug::Terminate, should not be called. The debugger should use operating-system facilities for terminating processes.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
