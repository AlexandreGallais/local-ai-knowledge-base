---
title: "ICorDebugModule::GetAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getassembly-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetAssembly Method

Gets the containing assembly for this module.

## Syntax

```cpp
HRESULT GetAssembly(
    [out] ICorDebugAssembly **ppAssembly
);
```

## Parameters

 `ppAssembly`
 [out] A pointer to an ICorDebugAssembly object that represents the assembly containing this module.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
