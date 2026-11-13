---
title: "ICorDebugModule::GetFunctionFromToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getfunctionfromtoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetFunctionFromToken <example-value>

Gets the function that is specified by the metadata token.

## Syntax

```cpp
HRESULT GetFunctionFromToken(
    [in] mdMethodDef methodDef,
    [out] ICorDebugFunction **ppFunction
);
```

## Parameters

 `methodDef`
 [in] A `mdMethodDef` metadata token that references the function's metadata.

 `ppFunction`
 [out] A pointer to the address of a ICorDebugFunction interface object that represents the function.

## Remarks

The `GetFunctionFromToken` method returns a CORDBG_E_FUNCTION_NOT_IL HRESULT if the value passed in `methodDef` does not refer to a common intermediate language (CIL) method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
