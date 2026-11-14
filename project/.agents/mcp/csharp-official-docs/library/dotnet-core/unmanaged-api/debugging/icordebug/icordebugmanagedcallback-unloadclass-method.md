---
title: "ICorDebugManagedCallback::UnloadClass Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-unloadclass-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::UnloadClass Method

Notifies the debugger that a class is being unloaded.

## Syntax

```cpp
HRESULT UnloadClass (
    [in] ICorDebugAppDomain  *pAppDomain,
    [in] ICorDebugClass      *c
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the class.

 `c`
 [in] A pointer to an ICorDebugClass object that represents the class.

## Remarks

The class should not be referenced after this call.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- LoadClass Method
- ICorDebugManagedCallback Interface
