---
title: "ICorDebugModule::GetBaseAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getbaseaddress-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
