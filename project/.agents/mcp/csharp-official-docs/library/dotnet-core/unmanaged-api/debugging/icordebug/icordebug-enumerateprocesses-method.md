---
title: "ICorDebug::EnumerateProcesses Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-enumerateprocesses-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebug::EnumerateProcesses Method

Gets an enumerator for the processes that are being debugged.

## Syntax

```cpp
HRESULT EnumerateProcesses (
    [out] ICorDebugProcessEnum      **ppProcess
);
```

## Parameters

 `ppProcess`
A pointer to the address of an ICorDebugProcessEnum object that is the enumerator for the processes being debugged.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
