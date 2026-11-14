---
title: "ICorDebugManagedCallback2::FunctionRemapOpportunity Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback2-functionremapopportunity-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback2::FunctionRemapOpportunity Method

Notifies the debugger that code execution has reached a sequence point in an older version of an edited function.

## Syntax

```cpp
HRESULT FunctionRemapOpportunity (
    [in] ICorDebugAppDomain   *pAppDomain,
    [in] ICorDebugThread      *pThread,
    [in] ICorDebugFunction    *pOldFunction,
    [in] ICorDebugFunction    *pNewFunction,
    [in] ULONG32              oldILOffset
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the edited function.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread on which the remap breakpoint was encountered.

 `pOldFunction`
 [in] A pointer to an ICorDebugFunction object that represents the version of the function that is currently running on the thread.

 `pNewFunction`
 [in] A pointer to an ICorDebugFunction object that represents the latest version of the function.

 `oldILOffset`
 [in] The common intermediate language (CIL) offset of the instruction pointer in the old version of the function.

## Remarks

This callback gives the debugger an opportunity to remap the instruction pointer to its proper place in the new version of the specified function by calling the ICorDebugILFrame2::RemapFunction method. If the debugger does not call `RemapFunction` before calling the ICorDebugController::Continue method, the runtime will continue to execute the old code and will fire another `FunctionRemapOpportunity` callback at the next sequence point.

This callback will be invoked for every frame that is executing an older version of the given function until the debugger returns S_OK.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugManagedCallback2 Interface
- ICorDebugManagedCallback Interface
