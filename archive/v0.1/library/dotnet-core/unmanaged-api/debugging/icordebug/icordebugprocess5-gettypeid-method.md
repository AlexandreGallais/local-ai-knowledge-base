---
title: "ICorDebugProcess5::GetTypeID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-gettypeid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::GetTypeID Method

Converts an object address to a COR_TYPEID identifier.

## Syntax

```cpp
HRESULT GetTypeID(
    [in] CORDB_ADDRESS obj,
    [out] COR_TYPEID *pId
);
```

## Parameters

 `obj`
 [in] The object address.

 `pId`
A pointer to the COR_TYPEID value that identifies the object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
