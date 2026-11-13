---
title: "ICorDebugModule::GetClassFromToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getclassfromtoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetClassFromToken Method

Gets the class specified by the metadata token.

## Syntax

```cpp
HRESULT GetClassFromToken(
    [in]  mdTypeDef        typeDef,
    [out] ICorDebugClass **ppClass
);
```

## Parameters

 `typedef`
 [in] An `mdTypeDef` metadata token that references the metadata of a class.

 `ppClass`
 [out] A pointer to the address of an ICorDebugClass object that represents the class.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
