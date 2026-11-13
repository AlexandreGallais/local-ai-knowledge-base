---
title: "ICorDebugManagedCallback::LoadAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-loadassembly-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
