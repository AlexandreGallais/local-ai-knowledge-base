---
title: "ICorDebugThread::GetAppDomain Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getappdomain-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetAppDomain Method

Gets an interface pointer to the application domain in which this ICorDebugThread is currently executing.

## Syntax

```cpp
HRESULT GetAppDomain (
    [out] ICorDebugAppDomain  **ppAppDomain
);
```

## Parameters

 `ppAppDomain`
 [out] A pointer to an ICorDebugAppDomain object that represents the application domain in which this thread is currently executing.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
