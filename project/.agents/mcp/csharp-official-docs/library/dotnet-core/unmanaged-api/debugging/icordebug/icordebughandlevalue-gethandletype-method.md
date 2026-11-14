---
title: "ICorDebugHandleValue::GetHandleType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebughandlevalue-gethandletype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHandleValue::GetHandleType Method

Gets a value that indicates the kind of handle referenced by this ICorDebugHandleValue object.

## Syntax

```cpp
HRESULT GetHandleType (
    [out] CorDebugHandleType  *pType
);
```

## Parameters

 `pType`
 [out] A pointer to a value of the CorDebugHandleType enumeration that indicates the type of this handle.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
