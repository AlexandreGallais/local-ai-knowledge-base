---
title: "ICorDebugEval2::CreateValueForType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval2-createvaluefortype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval2::CreateValueForType Method

Gets a pointer to a new ICorDebugValue of the specified type, with an initial value of zero or null.

## Syntax

```cpp
HRESULT CreateValueForType (
    [in] ICorDebugType         *pType,
    [out] ICorDebugValue       **ppValue
);
```

## Parameters

 `pType`
 [in] Pointer to an ICorDebugType object that represents the type.

 `ppValue`
 [out] Pointer to the address of an `ICorDebugValue` object that represents the value.

## Remarks

 `CreateValueForType` generalizes ICorDebugEval::CreateValue by allowing you to specify an arbitrary object type, including constructed types such as `List<int>`. The only purpose of this method is to generate a value that can be passed to a function evaluation.

The type must be a class or a value type. You cannot use this method to create array values or string values.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
