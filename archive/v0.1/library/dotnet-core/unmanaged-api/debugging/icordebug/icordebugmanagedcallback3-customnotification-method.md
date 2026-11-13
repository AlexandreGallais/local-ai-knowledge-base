---
title: "ICorDebugManagedCallback3::CustomNotification Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback3-customnotification-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback3::CustomNotification Method

Indicates that a custom debugger notification has been raised.

## Syntax

```cpp
HRESULT CustomNotification(ICorDebugThread *    pThread,
                           ICorDebugAppDomain * pAppDomain);
```

## Parameters

 `pThread`
 [in] A pointer to the thread that raised the notification.

 `pAppDomain`
 [in] A pointer to the application domain that contains the thread that raised the notification.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The method completed successfully.|

## Remarks

A subsequent call to the ICorDebugThread4::GetCurrentCustomDebuggerNotification method retrieves the thread object that was passed to the `System.Diagnostics.Debugger.NotifyOfCrossThreadDependency*` method. The thread object's type must have been previously enabled by calling the ICorDebugProcess3::SetEnableCustomNotification method. The debugger can read type-specific parameters from the fields of the thread object, and can store responses into fields.

The ICorDebug interface imposes no policy on the types of notifications or their contents, and the semantics of the notifications are strictly a contract between debuggers, applications, and .NET.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugManagedCallback3 Interface
