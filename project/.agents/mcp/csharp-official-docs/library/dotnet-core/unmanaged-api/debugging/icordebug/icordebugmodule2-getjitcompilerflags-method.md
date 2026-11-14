---
title: "ICorDebugModule2::GetJITCompilerFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule2-getjitcompilerflags-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule2::GetJITCompilerFlags Method

Gets the flags that control the just-in-time (JIT) compilation of this ICorDebugModule2.

## Syntax

```cpp
HRESULT GetJITCompilerFlags (
    [out] DWORD   *pdwFlags
);
```

## Parameters

 `pdwFlags`
 [out] A pointer to a value of the CorDebugJITCompilerFlags enumeration that controls the JIT compilation.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
