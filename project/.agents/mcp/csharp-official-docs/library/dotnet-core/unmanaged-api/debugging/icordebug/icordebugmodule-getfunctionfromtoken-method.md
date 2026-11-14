---
title: "ICorDebugModule::GetFunctionFromToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getfunctionfromtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
