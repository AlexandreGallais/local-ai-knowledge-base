---
title: "ICorDebugController::IsRunning Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-isrunning-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
