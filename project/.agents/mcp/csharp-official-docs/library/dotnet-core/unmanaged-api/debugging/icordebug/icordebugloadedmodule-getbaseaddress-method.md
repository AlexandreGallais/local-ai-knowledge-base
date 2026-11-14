---
title: "ICorDebugLoadedModule::GetBaseAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugloadedmodule-getbaseaddress-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
