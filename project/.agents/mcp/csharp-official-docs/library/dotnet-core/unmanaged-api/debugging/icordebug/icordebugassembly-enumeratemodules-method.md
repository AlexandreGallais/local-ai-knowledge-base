---
title: "ICorDebugAssembly::EnumerateModules Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-enumeratemodules-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
