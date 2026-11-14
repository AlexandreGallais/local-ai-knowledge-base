---
title: "ICorDebugManagedCallback::UnloadAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-unloadassembly-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::UnloadAssembly Method

Notifies the debugger that a common language runtime assembly has been unloaded.

## Syntax

```cpp
HRESULT UnloadAssembly (
    [in] IcorDebugAppDomain  *pAppDomain,
    [in] ICorDebugAssembly   *pAssembly
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain that contained the assembly.

 `pAssembly`
 [in] A pointer to an ICorDebugAssembly object that represents the assembly.

## Remarks

The assembly should not be used after this callback.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- LoadAssembly Method
- ICorDebugManagedCallback Interface
