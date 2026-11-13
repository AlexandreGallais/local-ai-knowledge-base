---
title: "ICorDebugAssembly::GetProcess Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-getprocess-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
