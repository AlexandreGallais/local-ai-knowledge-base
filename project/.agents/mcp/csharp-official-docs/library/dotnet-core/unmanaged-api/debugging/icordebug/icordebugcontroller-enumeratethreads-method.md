---
title: "ICorDebugController::EnumerateThreads Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-enumeratethreads-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugController::EnumerateThreads Method

Gets an enumerator for the active managed threads in the process.

## Syntax

```cpp
HRESULT EnumerateThreads (
    [out] ICorDebugThreadEnum **ppThreads
);
```

## Parameters

 `ppThreads`
 [out] A pointer to the address of an "ICorDebugThreadEnum" object that represents an enumerator for all managed threads that are active in the process.

## Remarks

A thread is considered active after the ICorDebugManagedCallback::CreateThread callback has been dispatched and before the ICorDebugManagedCallback::ExitThread callback has been dispatched. A managed thread may not necessarily have any managed frames on its stack. Threads can be enumerated even before the ICorDebugManagedCallback::CreateProcess callback. The enumeration will naturally be empty.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
