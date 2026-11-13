---
title: "ICorDebugEval::NewObjectNoConstructor Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-newobjectnoconstructor-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval::NewObjectNoConstructor Method

Allocates a new object instance of the specified type, without attempting to call a constructor method.

This method is obsolete. Use ICorDebugEval2::NewParameterizedObjectNoConstructor instead.

## Syntax

```cpp
HRESULT NewObjectNoConstructor (
    [in] ICorDebugClass     *pClass
);
```

## Parameters

 `pClass`
 [in] Pointer to an ICorDebugClass object that represents the type of object to be instantiated.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 1.1, 1.0

## See also

- NewParameterizedObjectNoConstructor Method
