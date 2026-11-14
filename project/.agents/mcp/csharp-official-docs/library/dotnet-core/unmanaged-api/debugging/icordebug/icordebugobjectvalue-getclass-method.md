---
title: "ICorDebugObjectValue::GetClass Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectvalue-getclass-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugObjectValue::GetClass Method

Gets the class of this object value.

## Syntax

```cpp
HRESULT GetClass (
    [out] ICorDebugClass     **ppClass
);
```

## Parameters

 `ppClass`
 [out] A pointer to the address of an "ICorDebugClass" object that represents the class of the object value represented by this "ICorDebugObjectValue" object.

## Remarks

The `GetClass` and ICorDebugValue::GetType methods each return information about the type of a value; they are both superseded by the generics-aware ICorDebugValue2::GetExactType.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
