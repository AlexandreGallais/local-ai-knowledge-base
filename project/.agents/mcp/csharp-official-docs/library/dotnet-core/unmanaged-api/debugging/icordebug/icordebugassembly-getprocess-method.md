---
title: "ICorDebugAssembly::GetProcess Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-getprocess-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAssembly::GetProcess Method

Gets an interface pointer to the process in which this ICorDebugAssembly instance is running.

## Syntax

```cpp
HRESULT GetProcess (
    [out] ICorDebugProcess **ppProcess
);
```

## Parameters

 `ppProcess`
 [out] A pointer to an ICorDebugProcess interface that represents the process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
