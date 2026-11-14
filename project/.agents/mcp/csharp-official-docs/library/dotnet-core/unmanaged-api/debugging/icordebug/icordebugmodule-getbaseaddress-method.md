---
title: "ICorDebugModule::GetBaseAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getbaseaddress-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetBaseAddress Method

Gets the base address of the module.

## Syntax

```cpp
HRESULT GetBaseAddress(
    [out] CORDB_ADDRESS *pAddress
);
```

## Parameters

 `pAddress`
 [out] A `CORDB_ADDRESS` that specifies the base address of the module.

## Remarks

If the module is a native image (that is, if the module was produced by the native image generator, NGen.exe), its base address will be zero.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
