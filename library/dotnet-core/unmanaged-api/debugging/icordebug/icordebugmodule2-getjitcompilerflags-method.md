---
title: "ICorDebugModule2::GetJITCompilerFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule2-getjitcompilerflags-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
