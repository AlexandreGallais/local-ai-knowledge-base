---
title: "ICorDebugObjectValue::GetFieldValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectvalue-getfieldvalue-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugObjectValue::GetFieldValue Method

Gets the value of the specified field of the specified class for this object value.

## Syntax

```cpp
HRESULT GetFieldValue (
    [in]  ICorDebugClass     *pClass,
    [in]  mdFieldDef         fieldDef,
    [out] ICorDebugValue     **ppValue
);
```

## Parameters

 `pClass`
 [in] A pointer to an "ICorDebugClass" object that represents the class for which to get the field value.

 `fieldDef`
 [in] An `mdFieldDef` token that references the metadata describing the field.

 `ppValue`
 [out] A pointer to an "ICorDebugValue" object that represents the value of the specified field.

## Remarks

The class, specified in the `pClass` parameter, must be in the hierarchy of the object value's class, and the field must be a field of that class.

The `GetFieldValue` method will still succeed for generic objects and generic classes. For example, if MyDictionary\<V> inherits from Dictionary\<string,V>, and the object value is of type MyDictionary\<int32>, passing the `ICorDebugClass` object for Dictionary\<K,V> will successfully get a field of Dictionary\<string,int32>.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
