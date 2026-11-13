---
title: "ICorDebugEval::NewObject Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-newobject-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval::NewObject Method

Allocates a new object instance and calls the specified constructor method.

This method is obsolete. Use ICorDebugEval2::NewParameterizedObject instead.

## Syntax

```cpp
HRESULT NewObject (
    [in] ICorDebugFunction  *pConstructor,
    [in] ULONG32            nArgs,
    [in, size_is(nArgs)] ICorDebugValue *ppArgs[]
);
```

## Parameters

 `pConstructor`
 [in] The constructor to be called.

 `nArgs`
 [in] The size of the `ppArgs` array.

 `ppArgs`
 [in] An array of ICorDebugValue objects, each of which represents an argument to be passed to the constructor.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 1.1, 1.0

## See also

- NewParameterizedObject Method
