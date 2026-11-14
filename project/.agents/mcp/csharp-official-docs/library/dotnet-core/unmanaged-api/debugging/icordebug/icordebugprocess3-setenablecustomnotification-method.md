---
title: "ICorDebugProcess3::SetEnableCustomNotification Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess3-setenablecustomnotification-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess3::SetEnableCustomNotification Method

Enables and disables custom debugger notifications of the specified type.

## Syntax

```cpp
HRESULT SetEnableCustomNotification(ICorDebugClass * pClass,
                                    BOOL fEnable);
```

## Parameters

 `pClass`
 [in] The type that specifies custom debugger notifications.

 `fEnable`
 [in] `true` to enable custom debugger notifications; `false` to disable notifications. The default value is `false`.

## Remarks

When `fEnable` is set to `true`, calls to the `System.Diagnostics.Debugger.NotifyOfCrossThreadDependency*` method trigger an ICorDebugManagedCallback3::CustomNotification callback. Notifications are disabled by default; therefore, the debugger must specify any notification types it knows about and wants to handle. Because the ICorDebugClass class is scoped by application domain, the debugger must call `SetEnableCustomNotification` for every application domain in the process if it wants to receive the notification across the entire process.

Starting with the .NET Framework 4, the only supported notification is a cross-thread dependency notification.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugProcess3 Interface
