---
title: "ICorDebugThread::CreateEval Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-createeval-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread::CreateEval Method

Creates an ICorDebugEval object that collects and exposes the functionality of this ICorDebugThread.

## Syntax

```cpp
HRESULT CreateEval (
    [out] ICorDebugEval   **ppEval
);
```

## Parameters

 `ppEval`
 [out] A pointer to the address of an `ICorDebugEval` object that collects and exposes the functionality of this thread.

## Remarks

The evaluation object will push a new chain on the thread before doing its computation. This interrupts the computation currently being performed on the thread until the evaluation completes.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
