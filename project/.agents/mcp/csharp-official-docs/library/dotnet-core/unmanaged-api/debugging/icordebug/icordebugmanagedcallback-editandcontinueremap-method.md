---
title: "ICorDebugManagedCallback::EditAndContinueRemap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-editandcontinueremap-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::EditAndContinueRemap Method

This method has been deprecated. It notifies the debugger that a remap event has been sent to the integrated development environment (IDE).

## Syntax

```cpp
HRESULT EditAndContinueRemap (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugThread *pThread,
    [in] ICorDebugFunction *pFunction,
    [in] BOOL fAccurate
);
```

## Remarks

The `EditAndContinueRemap` method is called when the execution of the code in an old version of an updated function has been attempted. The common language runtime calls the `EditAndContinueRemap` method to send a remap event to the IDE.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
