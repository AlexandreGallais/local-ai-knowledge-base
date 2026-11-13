---
title: "ICorDebugLoadedModule::GetBaseAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugloadedmodule-getbaseaddress-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugLoadedModule::GetBaseAddress Method

Gets the base address of the loaded module.

## Syntax

```cpp
HRESULT GetBaseAddress(
   [out] CORDB_ADDRESS *pAddress
);
```

## Parameters

 `pAddress`
 [out] A pointer to the base address of the loaded module.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugLoadedModule Interface
