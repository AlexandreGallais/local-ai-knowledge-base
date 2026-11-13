---
title: "ICorDebugFunction::GetILCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-getilcode-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction::GetILCode Method

Gets the ICorDebugCode instance that represents the common intermediate language (CIL) code associated with this ICorDebugFunction object.

## Syntax

```cpp
HRESULT GetILCode (
    [out] ICorDebugCode **ppCode
);
```

## Parameters

 `ppCode`
 [out] A pointer to the `ICorDebugCode` instance, or null, if the function was not compiled into CIL.

## Remarks

If Edit and Continue has been allowed on this function, the `GetILCode` method will get the CIL code corresponding to this function's edited version of the code in the common language runtime (CLR).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
