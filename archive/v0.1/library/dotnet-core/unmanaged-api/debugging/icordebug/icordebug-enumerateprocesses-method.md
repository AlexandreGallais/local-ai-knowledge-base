---
title: "ICorDebug::EnumerateProcesses Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebug-enumerateprocesses-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
