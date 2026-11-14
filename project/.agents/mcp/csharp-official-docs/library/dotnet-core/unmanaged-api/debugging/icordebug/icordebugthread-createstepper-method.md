---
title: "ICorDebugThread::CreateStepper Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-createstepper-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread::CreateStepper Method

Creates an ICorDebugStepper object that allows stepping through the active frame of this ICorDebugThread.

## Syntax

```cpp
HRESULT CreateStepper (
    [out] ICorDebugStepper **ppStepper
);
```

## Parameters

 `ppStepper`
 [out] A pointer to the address of an `ICorDebugStepper` object that allows stepping through the active frame of this thread.

## Remarks

The active frame may be unmanaged code.

The `ICorDebugStepper` interface must be used to perform the actual stepping.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
