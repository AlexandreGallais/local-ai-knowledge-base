---
title: "ICorDebugManagedCallback::EditAndContinueRemap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-editandcontinueremap-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
