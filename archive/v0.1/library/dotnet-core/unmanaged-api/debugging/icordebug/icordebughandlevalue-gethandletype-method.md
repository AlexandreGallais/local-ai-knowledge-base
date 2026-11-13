---
title: "ICorDebugHandleValue::GetHandleType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebughandlevalue-gethandletype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
