---
title: "ICorDebugAssembly::EnumerateModules Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-enumeratemodules-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAssembly::EnumerateModules Method

Gets an enumerator for the modules contained in the `ICorDebugAssembly`.

## Syntax

```cpp
HRESULT EnumerateModules (
    [out] ICorDebugModuleEnum **ppModules
);
```

## Parameters

 `ppModules`
 [out] A pointer to the address of the ICorDebugModuleEnum interface that is the enumerator.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
