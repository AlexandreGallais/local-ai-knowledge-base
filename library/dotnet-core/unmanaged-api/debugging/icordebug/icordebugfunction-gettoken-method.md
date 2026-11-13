---
title: "ICorDebugFunction::GetToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-gettoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction::GetToken <example-value>

Gets the metadata token for this function.

## Syntax

```cpp
HRESULT GetToken (
    [out] mdMethodDef *pMethodDef
);
```

## Parameters

 `pMethodDef`
 [out] A pointer to an `mdMethodDef` token that references the metadata for this function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
