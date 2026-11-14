---
title: "ICorDebugAppDomain4::GetObjectForCCW Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain4-getobjectforccw-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain4::GetObjectForCCW Method

Gets a managed object from a COM callable wrapper (CCW) pointer.

## Syntax

```cpp
HRESULT GetObjectForCCW(
   [in]CORDB_ADDRESS ccwPointer,
   [out]ICorDebugValue **ppManagedObject
);
```

## Parameters

 `ccwPointer`
 [in] A COM callable wrapper (CCW) pointer.

 `ppManagedObject`
 [out] A pointer to the address of an "ICorDebugValue" object that represents the managed object that corresponds to the given CCW pointer.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugAppDomain4 Interface
