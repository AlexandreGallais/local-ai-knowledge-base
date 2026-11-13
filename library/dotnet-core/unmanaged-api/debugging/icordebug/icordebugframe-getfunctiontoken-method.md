---
title: "ICorDebugFrame::GetFunctionToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getfunctiontoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetFunctionToken Method

Gets the metadata token for the function that contains the code associated with this stack frame.

## Syntax

```cpp
HRESULT GetFunctionToken (
    [out] mdMethodDef        *pToken
);
```

## Parameters

 `pToken`
 [out] A pointer to an `mdMethodDef` token that references the metadata for the function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
