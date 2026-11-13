---
title: "ICorDebugThread2::GetVolatileOSThreadID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread2-getvolatileosthreadid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread2::GetVolatileOSThreadID Method

Gets the operating system thread identifier for this ICorDebugThread2.

## Syntax

```cpp
HRESULT GetVolatileOSThreadID (
    [out] DWORD    *pdwTid
);
```

## Parameters

 `pdwTid`
 [out] The operating system thread identifier for this thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
