---
title: "ICorDebugGenericValue::GetValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebuggenericvalue-getvalue-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
