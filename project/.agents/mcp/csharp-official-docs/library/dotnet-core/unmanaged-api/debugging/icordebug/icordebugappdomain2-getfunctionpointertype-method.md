---
title: "ICorDebugAppDomain2::GetFunctionPointerType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain2-getfunctionpointertype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain2::GetFunctionPointerType Method

Gets a pointer to a function that has a given signature.

## Syntax

```cpp
HRESULT GetFunctionPointerType (
    [in] ULONG32                             nTypeArgs,
    [in, size_is(nTypeArgs)] ICorDebugType   *ppTypeArgs[],
    [out] ICorDebugType                      **ppType
);
```

## Parameters

 `nTypeArgs`
 [in] The number of type arguments for the function.

 `ppTypeArgs`
 [in] An array of pointers, each of which points to an ICorDebugType object that represents a type argument of the function. The first element is the return type; each of the other elements is a parameter type.

 `ppType`
 [out] A pointer to the address of an `ICorDebugType` object that represents the pointer to the function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
