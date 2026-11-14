---
title: "ICorDebugValue::GetAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue-getaddress-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugValue::GetAddress Method

Gets the address of this "ICorDebugValue" object, which is in the process of being debugged.

## Syntax

```cpp
HRESULT GetAddress (
    [out] CORDB_ADDRESS   *pAddress
);
```

## Parameters

 `pAddress`
 [out] Pointer to a `CORDB_ADDRESS` object that specifies the address of this value object.

## Remarks

If the value is unavailable, 0 (zero) is returned. This could happen if the value is at least partly in registers or stored in a garbage collector handle (`GCHandle`).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
