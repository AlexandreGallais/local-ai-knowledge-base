---
title: "ICorDebugManagedCallback::ExitThread Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-exitthread-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::ExitThread Method

Notifies the debugger that a thread that was executing managed code has exited.

## Syntax

```cpp
HRESULT ExitThread (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugThread    *thread
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the managed thread.

 `thread`
 [in] A pointer to an ICorDebugThread object that represents the managed thread.

## Remarks

Once the `ExitThread` callback is fired, the thread will no longer appear in thread enumerations.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
