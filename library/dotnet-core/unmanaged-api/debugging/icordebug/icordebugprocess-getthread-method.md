---
title: "ICorDebugProcess::GetThread Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-getthread-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess::GetThread Method

Gets this process's thread that has the specified operating system (OS) thread ID.

## Syntax

```cpp
HRESULT GetThread(
    [in] DWORD dwThreadId,
    [out] ICorDebugThread **ppThread);
```

## Parameters

 `dwThreadId`
 [in] The OS thread ID of the thread to be retrieved.

 `ppThread`
 [out] A pointer to the address of an ICorDebugThread object that represents the thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
