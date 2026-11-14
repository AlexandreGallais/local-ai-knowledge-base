---
title: "ICorDebugThread::CreateEval Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-createeval-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
