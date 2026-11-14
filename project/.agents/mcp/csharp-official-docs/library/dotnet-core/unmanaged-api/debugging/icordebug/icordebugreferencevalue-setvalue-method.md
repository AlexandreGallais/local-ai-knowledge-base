---
title: "ICorDebugReferenceValue::SetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugreferencevalue-setvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugReferenceValue::SetValue Method

Sets the specified memory address. That is, this method sets this ICorDebugReferenceValue to point to an object.

## Syntax

```cpp
HRESULT SetValue (
    [in] CORDB_ADDRESS    value
);
```

## Parameters

 `value`
 [in] A `CORDB_ADDRESS` value that specifies the address of the object to which this `ICorDebugReferenceValue` points.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
