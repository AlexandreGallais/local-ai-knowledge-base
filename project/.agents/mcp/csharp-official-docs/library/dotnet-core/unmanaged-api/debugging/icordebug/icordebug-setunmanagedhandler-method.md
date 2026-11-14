---
title: "ICorDebug::SetUnmanagedHandler Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-setunmanagedhandler-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebug::SetUnmanagedHandler Method

Specifies the event handler object for unmanaged events.

## Syntax

```cpp
HRESULT SetUnmanagedHandler (
    [in] ICorDebugUnmanagedCallback  *pCallback
);
```

## Parameters

 `pCallback`
 [in] A pointer to an ICorDebugUnmanagedCallback object that represents the event handler for unmanaged events.

## Remarks

The event handler object for unmanaged events must be set after a call to ICorDebug::Initialize and before any calls to ICorDebug::CreateProcess or ICorDebug::DebugActiveProcess. However, for legacy purposes, you are not required to set the event handler object for unmanaged events until the first native debug event is raised. Specifically, if `ICorDebug::CreateProcess` has set the CREATE_SUSPENDED flag, native debug events cannot be dispatched until the main thread is resumed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
