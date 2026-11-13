---
title: "ICorDebugProcess2::GetDesiredNGENCompilerFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-getdesiredngencompilerflags-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess2::GetDesiredNGENCompilerFlags Method

Gets the current compiler flag settings that the common language runtime (CLR) uses to select the correct precompiled (that is, native) image to be loaded into this process.

## Syntax

```cpp
HRESULT GetDesiredNGENCompilerFlags (
    [out] DWORD   *pdwFlags
);
```

## Parameters

 `pdwFlags`
 [out] A pointer to a bitwise combination of the CorDebugJITCompilerFlags enumeration values that are used to select the correct precompiled image to be loaded.

## Remarks

Use the ICorDebugProcess2::SetDesiredNGENCompilerFlags method to set the flags that the CLR will use to select the correct pre-compiled image to load.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
