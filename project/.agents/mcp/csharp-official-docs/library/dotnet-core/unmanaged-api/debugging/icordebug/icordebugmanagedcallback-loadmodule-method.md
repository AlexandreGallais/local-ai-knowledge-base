---
title: "ICorDebugManagedCallback::LoadModule Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-loadmodule-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::LoadModule Method

Notifies the debugger that a common language runtime (CLR) module has been successfully loaded.

## Syntax

```cpp
HRESULT LoadModule (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugModule    *pModule
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain into which the module has been loaded.

 `pModule`
 [in] A pointer to an ICorDebugModule object that represents the CLR module.

## Remarks

The `LoadModule` callback provides an appropriate time to examine metadata for the module, set just-in-time (JIT) compiler flags, or enable or disable class loading callbacks for the module.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- UnloadModule Method
- ICorDebugManagedCallback Interface
