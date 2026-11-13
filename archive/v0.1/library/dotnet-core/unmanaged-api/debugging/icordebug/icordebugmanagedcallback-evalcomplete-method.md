---
title: "ICorDebugManagedCallback::EvalComplete Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-evalcomplete-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::EvalComplete Method

Notifies the debugger that an evaluation has been completed.

## Syntax

```cpp
HRESULT EvalComplete (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugThread    *pThread,
    [in] ICorDebugEval      *pEval
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain in which the evaluation was performed.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the thread in which the evaluation was performed.

 `pEval`
 [in] A pointer to an ICorDebugEval object that represents the code that performed the evaluation.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
