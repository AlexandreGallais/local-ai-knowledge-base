---
title: "ICorDebugThread::GetID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetID Method

Gets the current operating system identifier of the active part of this ICorDebugThread.

## Syntax

```cpp
HRESULT GetID (
    [out] DWORD *pdwThreadId
);
```

## Parameters

 `pdwThreadId`
 [out] The identifier of the thread.

## Remarks

The operating system identifier can potentially change during execution of a process, and can be a different value for different parts of the thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
