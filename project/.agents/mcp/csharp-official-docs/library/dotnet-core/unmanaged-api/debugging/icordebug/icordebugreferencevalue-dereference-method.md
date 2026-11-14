---
title: "ICorDebugReferenceValue::Dereference Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugreferencevalue-dereference-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
