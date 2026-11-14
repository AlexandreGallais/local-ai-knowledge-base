---
title: "ICorDebugBoxValue::GetObject Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugboxvalue-getobject-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
