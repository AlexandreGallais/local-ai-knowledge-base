---
title: "ICorDebugManagedCallback2::FunctionRemapComplete Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-functionremapcomplete-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2::FunctionRemapComplete Method

Notifies the debugger that code execution has switched to a new version of an edited function.

## Syntax

```cpp
HRESULT FunctionRemapComplete (
    [in] ICorDebugAppDomain   *pAppDomain,
    [in] ICorDebugThread      *pThread,
    [in] ICorDebugFunction    *pFunction
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the edited function.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread on which the remap breakpoint was encountered.

 `pFunction`
 [in] A pointer to an ICorDebugFunction object that represents the version of the function currently running on the thread.

## Remarks

This callback gives the debugger an opportunity to recreate any steppers that previously existed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugManagedCallback2 Interface
- ICorDebugManagedCallback Interface
