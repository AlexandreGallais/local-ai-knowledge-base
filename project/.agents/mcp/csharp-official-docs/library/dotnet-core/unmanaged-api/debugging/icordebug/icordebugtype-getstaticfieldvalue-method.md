---
title: "ICorDebugType::GetStaticFieldValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-getstaticfieldvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugType::GetStaticFieldValue Method

Gets an interface pointer to an ICorDebugValue object that contains the value of the static field referenced by the specified field token in the specified stack frame.

## Syntax

```cpp
HRESULT GetStaticFieldValue (
    [in]  mdFieldDef        fieldDef,
    [in]  ICorDebugFrame    *pFrame,
    [out] ICorDebugValue    **ppValue
);
```

## Parameters

 `fieldDef`
 [in] An `mdFieldDef` token that specifies the static field.

 `pFrame`
 [in] A pointer to an ICorDebugFrame that represents the stack frame.

 `ppValue`
 [out] A pointer to the address of an `ICorDebugValue` that contains the value of the static field.

## Remarks

The `GetStaticFieldValue` method may be used only if the type is ELEMENT_TYPE_CLASS or ELEMENT_TYPE_VALUETYPE, as indicated by the ICorDebugType::GetType method.

For non-generic types, the operation performed by `GetStaticFieldValue` is identical to calling ICorDebugClass::GetStaticFieldValue on the ICorDebugClass object that is returned by ICorDebugType::GetClass.

For generic types, a static field value will be relative to a particular instantiation. Also, if the static field could possibly be relative to a thread, a context, or an application domain, then the stack frame will help the debugger determine the proper value.

 `GetStaticFieldValue` can be used only when a call to `ICorDebugType::GetType` returns a value of ELEMENT_TYPE_CLASS or ELEMENT_TYPE_VALUETYPE.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
