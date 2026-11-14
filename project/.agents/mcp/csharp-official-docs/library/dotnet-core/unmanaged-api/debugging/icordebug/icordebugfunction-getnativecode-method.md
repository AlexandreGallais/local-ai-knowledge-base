---
title: "ICorDebugFunction::GetNativeCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-getnativecode-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunction::GetNativeCode Method

Gets the native code for the function that is represented by this ICorDebugFunction instance.

## Syntax

```cpp
HRESULT GetNativeCode (
    [out] ICorDebugCode **ppCode
);
```

## Parameters

 `ppCode`
 [out] A pointer to the ICorDebugCode instance that represents the native code for this function, or null, if this function is common intermediate language (CIL) code that has not been just-in-time (JIT) compiled.

## Remarks

If the function that is represented by this `ICorDebugFunction` instance has been JIT-compiled more than once, as in the case of generic types, `GetNativeCode` returns a random native code object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
