---
title: "ICorDebugProcess5::GetTypeID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-gettypeid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
