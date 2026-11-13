---
title: "ICorDebugThread::GetHandle Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-gethandle-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetHandle Method

Gets the current handle for the active part of this ICorDebugThread.

## Syntax

```cpp
HRESULT GetHandle (
    [out] HTHREAD *phThreadHandle
);
```

## Parameters

 `phThreadHandle`
 [out] A pointer to an HTHREAD that is the handle of the active part of this thread.

## Remarks

The handle may change as the process executes, and may be different for different parts of the thread.

This handle is owned by the debugging API. The debugger should duplicate it before using it.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
