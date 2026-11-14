---
title: "ICorDebugValue::GetType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue-gettype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugValue::GetType Method

Gets the primitive type of this "ICorDebugValue" object.

## Syntax

```cpp
HRESULT GetType (
    [out] CorElementType   *pType
);
```

## Parameters

 `pType`
 [out] A pointer to a value of the "CorElementType" enumeration that indicates the value's type.

## Remarks

If the object is a complex runtime type, that type may be examined through the appropriate subclasses of the `ICorDebugValue` interface. For example, "ICorDebugObjectValue", which inherits from `ICorDebugValue`, represents a complex type.

The `GetType` and ICorDebugObjectValue::GetClass methods each return information about the type of a value. They are both superseded by the generics-aware ICorDebugValue2::GetExactType method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
