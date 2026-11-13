---
title: "ICorDebugModule::EnableClassLoadCallbacks Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-enableclassloadcallbacks-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule::EnableClassLoadCallbacks Method

Controls whether the ICorDebugManagedCallback::LoadClass and ICorDebugManagedCallback::UnloadClass callbacks are called for this module.

## Syntax

```cpp
HRESULT EnableClassLoadCallbacks(
    [in] BOOL bClassLoadCallbacks
);
```

## Parameters

 `bClassLoadCallbacks`
 [in] Set this value to `true` to enable the common language runtime (CLR) to call the `ICorDebugManagedCallback::LoadClass` and `ICorDebugManagedCallback::UnloadClass` methods when their associated events occur.

The default value is `false` for non-dynamic modules. The value is always `true` for dynamic modules and cannot be changed.

## Remarks

The `ICorDebugManagedCallback::LoadClass` and `ICorDebugManagedCallback::UnloadClass` callbacks are always enabled for dynamic modules and cannot be disabled.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
