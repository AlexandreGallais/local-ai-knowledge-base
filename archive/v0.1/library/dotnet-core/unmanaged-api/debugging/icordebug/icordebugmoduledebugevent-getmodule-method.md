---
title: "ICorDebugModuleDebugEvent::GetModule Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmoduledebugevent-getmodule-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModuleDebugEvent::GetModule Method

Gets the merged module that was just loaded or unloaded.

## Syntax

```cpp
HRESULT GetModule(
   [out]ICorDebugModule **ppModule
);
```

## Parameters

 `ppModule`
 [out] A pointer to the address of an ICorDebugModule object that represents the merged module that was just loaded or unloaded.

## Remarks

You can call the GetEventKind method to determine whether the module was loaded or unloaded.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugModuleDebugEvent Interface
