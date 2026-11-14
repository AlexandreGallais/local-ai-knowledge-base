---
title: "ICorDebugModule::GetSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getsize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
