---
title: "ICorDebugValue2::GetExactType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue2-getexacttype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugValue2::GetExactType Method

Gets an interface pointer to an "ICorDebugType" object that represents the `System.Type` of this value.

## Syntax

```cpp
HRESULT GetExactType (
    [out] ICorDebugType   **ppType
);
```

## Parameters

 `ppType`
 [out] A pointer to the address of an `ICorDebugType` object that represents the `System.Type` of the value represented by this "ICorDebugValue2" object.

## Remarks

The generics-aware `GetExactType` method supersedes both the ICorDebugObjectValue::GetClass and the ICorDebugValue::GetType methods, each of which return information about the type of a value.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
