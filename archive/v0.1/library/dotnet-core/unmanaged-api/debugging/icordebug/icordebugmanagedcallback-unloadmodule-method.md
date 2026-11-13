---
title: "ICorDebugManagedCallback::UnloadModule Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-unloadmodule-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::UnloadModule Method

Notifies the debugger that a common language runtime module (DLL) has been unloaded.

## Syntax

```cpp
HRESULT UnloadModule (
    [in] ICorDebugAppDomain  *pAppDomain,
    [in] ICorDebugModule     *pModule
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain that contained the module.

 `pModule`
 [in] A pointer to an ICorDebugModule object that represents the module.

## Remarks

The module should not be used after this call.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- LoadModule Method
- ICorDebugManagedCallback Interface
