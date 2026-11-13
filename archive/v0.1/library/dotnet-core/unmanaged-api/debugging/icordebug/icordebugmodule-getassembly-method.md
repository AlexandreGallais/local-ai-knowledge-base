---
title: "ICorDebugModule::GetAssembly Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getassembly-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
