---
title: "ICorDebugModule::GetClassFromToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getclassfromtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetClassFromToken <example-value>

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
