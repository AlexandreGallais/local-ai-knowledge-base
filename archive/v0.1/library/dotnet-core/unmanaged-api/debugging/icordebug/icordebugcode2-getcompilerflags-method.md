---
title: "ICorDebugCode2::GetCompilerFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode2-getcompilerflags-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode2::GetCompilerFlags Method

Gets the flags that specify the conditions under which this code object was either just-in-time (JIT) compiled or generated using the native image generator (Ngen.exe).

## Syntax

```cpp
HRESULT GetCompilerFlags (
    [out] DWORD *pdwFlags
);
```

## Parameters

`pdwFlags`
[out] A pointer to a value of the CorDebugJITCompilerFlags enumeration that specifies the behavior of the JIT compiler or the native image generator.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 2.0
