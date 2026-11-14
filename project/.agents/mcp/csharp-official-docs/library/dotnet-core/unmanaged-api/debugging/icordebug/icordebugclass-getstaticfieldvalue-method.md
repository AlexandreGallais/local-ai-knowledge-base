---
title: "ICorDebugClass::GetStaticFieldValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugclass-getstaticfieldvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugClass::GetStaticFieldValue Method

Gets the value of the specified static field.

## Syntax

```cpp
HRESULT GetStaticFieldValue (
    [in]  mdFieldDef         fieldDef,
    [in]  ICorDebugFrame     *pFrame,
    [out] ICorDebugValue     **ppValue
);
```

## Parameters

 `fieldDef`
 [in] A field `Def` token that references the field to be retrieved.

 `pFrame`
 [in] A pointer to an ICorDebugFrame object that represents the frame to be used to disambiguate among thread, context, or application domain statics.

If the static field is relative to a thread, a context, or an application domain, the frame will determine the proper value.

 `ppValue`
 [out] A pointer to the address of an ICorDebugValue object that represents the value of the static field.

## Remarks

For parameterized types, the value of a static field is relative to the particular instantiation. Therefore, if the class constructor takes parameters of type `System.Type`, call ICorDebugType::GetStaticFieldValue instead of `ICorDebugClass::GetStaticFieldValue`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
