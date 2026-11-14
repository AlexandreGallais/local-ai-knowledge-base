---
title: "ICorDebugManagedCallback::LoadAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-loadassembly-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::LoadAssembly Method

Notifies the debugger that a common language runtime (CLR) assembly has been successfully loaded.

## Syntax

```cpp
HRESULT LoadAssembly (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugAssembly  *pAssembly
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain into which the assembly has been loaded.

 `pAssembly`
 [in] A pointer to an ICorDebugAssembly object that represents the assembly.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- UnloadAssembly Method
- ICorDebugManagedCallback Interface
