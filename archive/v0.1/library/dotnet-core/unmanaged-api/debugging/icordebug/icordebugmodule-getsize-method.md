---
title: "ICorDebugModule::GetSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getsize-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetSize Method

Gets the size, in bytes, of the module.

## Syntax

```cpp
HRESULT GetSize(
    [out] ULONG32 *pcBytes
);
```

## Parameters

 `pcBytes`
 [out] The size of the module in bytes.

If the module was produced from the native image generator (NGen.exe), the size of the module will be zero.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
