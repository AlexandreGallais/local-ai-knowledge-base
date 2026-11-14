---
title: "ICorDebugGenericValue::GetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebuggenericvalue-getvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugGenericValue::GetValue Method

Copies the value of this generic into the specified buffer.

## Syntax

```cpp
HRESULT GetValue (
    [out] void     *pTo
);
```

## Parameters

 `pTo`
 [out] A pointer to the value that is represented by this ICorDebugGenericValue object. The value may be a simple type or a reference type (that is, a pointer).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
