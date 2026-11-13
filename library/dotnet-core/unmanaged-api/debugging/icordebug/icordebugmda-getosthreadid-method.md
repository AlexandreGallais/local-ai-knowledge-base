---
title: "ICorDebugMDA::GetOSThreadId Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmda-getosthreadid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
