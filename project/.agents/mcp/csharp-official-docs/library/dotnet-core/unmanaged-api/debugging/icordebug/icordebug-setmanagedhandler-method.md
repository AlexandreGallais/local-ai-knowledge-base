---
title: "ICorDebug::SetManagedHandler Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-setmanagedhandler-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebug::SetManagedHandler Method

Specifies the event handler object for managed events.

## Syntax

```cpp
HRESULT SetManagedHandler (
    [in] ICorDebugManagedCallback     *pCallback
);
```

## Parameters

 `pCallback`
 [in] A pointer to an ICorDebugManagedCallback object, which is the event handler object.

## Remarks

 `SetManagedHandler` must be called at creation time.

If the `ICorDebugManagedCallback` implementation does not contain sufficient interfaces to handle debugging events for the application that is being debugged, `SetManagedHandler` returns an HRESULT of E_NOINTERFACE.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
