---
title: "ICorDebugMDA::GetOSThreadId Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmda-getosthreadid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMDA::GetOSThreadId Method

Gets the operating system (OS) thread identifier upon which the managed debugging assistant (MDA) represented by ICorDebugMDA is executing.

## Syntax

```cpp
HRESULT GetOSThreadId (
    [out] DWORD    *pOsTid
);
```

## Parameters

 `pOsTid`
 [out] A pointer to the OS thread identifier.

## Remarks

The OS thread is used instead of an ICorDebugThread to allow for situations in which an MDA is fired either on a native thread or on a managed thread that has not yet entered managed code.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugMDA Interface
- Diagnose Errors with Managed Debugging Assistants
