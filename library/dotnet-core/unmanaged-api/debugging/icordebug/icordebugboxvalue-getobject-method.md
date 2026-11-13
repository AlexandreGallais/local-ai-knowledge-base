---
title: "ICorDebugBoxValue::GetObject Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugboxvalue-getobject-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugBoxValue::GetObject Method

Gets the boxed value.

## Syntax

```cpp
HRESULT GetObject (
    [out] ICorDebugObjectValue **ppObject
);
```

## Parameters

 `ppObject`
 [out] A pointer to the address of an ICorDebugObjectValue object that represents the boxed value.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
