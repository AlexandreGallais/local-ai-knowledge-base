---
title: "ICorDebugModule::IsDynamic Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-isdynamic-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule::IsDynamic Method

Gets a value that indicates whether this module is dynamic.

## Syntax

```cpp
HRESULT IsDynamic(
    [out] BOOL *pDynamic
);
```

## Parameters

 `pDynamic`
 [out] `true` if this module is dynamic; otherwise, `false`.

## Remarks

A dynamic module can add new classes and delete existing classes even after the module has been loaded. The ICorDebugManagedCallback::LoadClass and ICorDebugManagedCallback::UnloadClass callbacks inform the debugger when a class has been added or deleted.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
