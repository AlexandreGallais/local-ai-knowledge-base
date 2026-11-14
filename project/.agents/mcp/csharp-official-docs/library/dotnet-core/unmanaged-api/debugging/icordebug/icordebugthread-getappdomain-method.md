---
title: "ICorDebugThread::GetAppDomain Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getappdomain-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
