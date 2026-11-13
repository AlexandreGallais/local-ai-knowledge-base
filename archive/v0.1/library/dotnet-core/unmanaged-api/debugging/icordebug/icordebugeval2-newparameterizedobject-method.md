---
title: "ICorDebugEval2::NewParameterizedObject Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval2-newparameterizedobject-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval2::NewParameterizedObject Method

Instantiates a new parameterized type object and calls the object's constructor method.

## Syntax

```cpp
HRESULT NewParameterizedObject (
    [in] ICorDebugFunction     *pConstructor,
    [in] ULONG32               nTypeArgs,
    [in, size_is(nTypeArgs)] ICorDebugType *ppTypeArgs[],
    [in] ULONG32               nArgs,
    [in, size_is(nArgs)] ICorDebugValue *ppArgs[]
);
```

## Parameters

 `pConstructor`
 [in] A pointer to an ICorDebugFunction object that represents the constructor of the object to be instantiated.

 `nTypeArgs`
 [in] The number of type arguments passed.

 `ppTypeArgs`
 [in] An array of pointers, each of which points to an ICorDebugType object that represents a type argument for the object that is being instantiated.

 `nArgs`
 [in] The number of arguments passed to the constructor.

 `ppArgs`
 [in] An array of pointers, each of which points to an ICorDebugValue object that represents an argument value that is passed to the constructor.

## Remarks

The object's constructor may take `System.Type` parameters.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
