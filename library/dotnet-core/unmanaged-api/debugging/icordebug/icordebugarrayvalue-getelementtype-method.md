---
title: "ICorDebugArrayValue::GetElementType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getelementtype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::GetElementType Method

Gets a value that indicates the simple type of the elements in the array.

## Syntax

```cpp
HRESULT GetElementType (
    [out] CorElementType  *pType
);
```

## Parameters

 `pType`
 [out] A pointer to a value of the CorElementType enumeration that indicates the type.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
