---
title: "ICorDebugController::IsRunning Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-isrunning-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugController::IsRunning Method

Gets a value that indicates whether the threads in the process are currently running freely.

## Syntax

```cpp
HRESULT IsRunning (
    [out] BOOL *pbRunning
);
```

## Parameters

 `pbRunning`
 [out] A pointer to a value that is `true` if the threads in the process are running freely; otherwise, `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
