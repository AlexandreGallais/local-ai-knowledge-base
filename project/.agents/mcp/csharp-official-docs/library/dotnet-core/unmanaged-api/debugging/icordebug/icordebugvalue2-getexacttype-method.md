---
title: "ICorDebugValue2::GetExactType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue2-getexacttype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
