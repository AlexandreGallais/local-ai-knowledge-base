---
title: "ICorDebugManagedCallback::LoadClass Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-loadclass-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::LoadClass Method

Notifies the debugger that a class has been loaded.

## Syntax

```cpp
HRESULT LoadClass (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugClass     *c
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain into which the class has been loaded.

 `c`
 [in] A pointer to an ICorDebugClass object that represents the class.

## Remarks

This callback occurs only if class loading has been enabled for the module that contains the class. Class loading is always enabled for dynamic modules.

The `LoadClass` callback provides an appropriate time to bind breakpoints to newly generated classes in dynamic modules.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- UnloadClass Method
- ICorDebugManagedCallback Interface
