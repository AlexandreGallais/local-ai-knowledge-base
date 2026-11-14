---
title: "ICorDebugEval::CreateValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-createvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval::CreateValue Method

Creates a value of the specified type, with an initial value of zero or null.

This method is obsolete. Use ICorDebugEval2::CreateValueForType instead.

## Syntax

```cpp
HRESULT CreateValue (
    [in] CorElementType     elementType,
    [in] ICorDebugClass     *pElementClass,
    [out] ICorDebugValue    **ppValue
);
```

## Parameters

 `elementType`\
 [in] A value of the CorElementType enumeration that specifies the type of the value.

 `pElementClass`\
 [in] Pointer to an ICorDebugClass object that specifies the class of the value, if the type is not a primitive type.

 `ppValue`\
 [out] Pointer to the address of an "ICorDebugValue" object that represents the value.

## Remarks

 `CreateValue` creates an `ICorDebugValue` object of the given type for the sole purpose of using it in a function evaluation. This value object can be used to pass user constants as parameters.

If the type of the value is a primitive type, its initial value is zero or null. Use ICorDebugGenericValue::SetValue to set the value of a primitive type.

If the value of `elementType` is ELEMENT_TYPE_CLASS, you get an "ICorDebugReferenceValue" (returned in `ppValue`) representing the null object reference. You can use this object to pass null to a function evaluation that has object reference parameters. You cannot set the `ICorDebugValue` to anything; it always remains null.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 1.1, 1.0

## See also

- CreateValueForType Method
- ICorDebugEval Interface
