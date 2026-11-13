---
title: "ICorDebugEval2::NewParameterizedObjectNoConstructor Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval2-newparameterizedobjectnoconstructor-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval2::NewParameterizedObjectNoConstructor Method

Instantiates a new parameterized type object of the specified class without attempting to call a constructor method.

## Syntax

```cpp
HRESULT NewParameterizedObjectNoConstructor (
    [in] ICorDebugClass        *pClass,
    [in] ULONG32               nTypeArgs,
    [in, size_is(nTypeArgs)] ICorDebugType *ppTypeArgs[]
);
```

## Parameters

 `pClass`
 [in] A pointer to an ICorDebugClass object that represents the class of the object to be instantiated.

 `nTypeArgs`
 [in] The number of type arguments passed.

 `ppTypeArgs`
 [in] An array of pointers, each of which points to an ICorDebugType object that represents a type argument for the object that is being instantiated.

## Remarks

The `NewParameterizedObjectNoConstructor` method will fail if an incorrect number of type arguments or the wrong types of type arguments are passed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
