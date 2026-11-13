---
title: "ICorDebugProcess5::GetObject Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-getobject-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::GetObject Method

Converts an object address to an "ICorDebugObjectValue" object.

## Syntax

```cpp
HRESULT GetObject(
    [in] CORDB_ADDRESS addr,
    [out] ICorDebugObjectValue **ppObject
);
```

## Parameters

 `addr`
 [in] The object address.

 `ppObject`
 [out] A pointer to the address of an  "ICorDebugObjectValue" object.

## Remarks

If `addr` does not point to a valid managed object, the `GetObject` method returns `E_FAIL`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
