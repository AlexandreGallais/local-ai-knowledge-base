---
title: "ICorDebugAppDomain4::GetObjectForCCW Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain4-getobjectforccw-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
