---
title: "ICorDebugObjectValue::GetClass Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectvalue-getclass-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
