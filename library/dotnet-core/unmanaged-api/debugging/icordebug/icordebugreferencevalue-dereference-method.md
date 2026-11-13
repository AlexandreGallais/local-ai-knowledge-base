---
title: "ICorDebugReferenceValue::Dereference Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugreferencevalue-dereference-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugReferenceValue::Dereference Method

Gets the object that is referenced.

## Syntax

```cpp
HRESULT Dereference (
    [out] ICorDebugValue  **ppValue
);
```

## Parameters

 `ppValue`
 [out] A pointer to the address of an ICorDebugValue that represents the object to which this ICorDebugReferenceValue object points.

## Remarks

The `ICorDebugValue` object is valid only while its reference has not yet been disabled.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
