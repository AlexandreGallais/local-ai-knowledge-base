---
title: "ICorDebugManagedCallback::LogMessage Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-logmessage-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::LogMessage Method

Notifies the debugger that a common language runtime (CLR) managed thread has called a method in the `System.Diagnostics.EventLog` class to log an event.

## Syntax

```cpp
HRESULT LogMessage (
    [in] ICorDebugAppDomain  *pAppDomain,
    [in] ICorDebugThread     *pThread,
    [in] LONG                 lLevel,
    [in] WCHAR               *pLogSwitchName,
    [in] WCHAR               *pMessage
);
```

## Parameters

 `pAppDomain`
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the managed thread that logged the event.

 `pThread`
 [in] A pointer to an ICorDebugThread object that represents the managed thread.

 `lLevel`
 [in] A value of the LoggingLevelEnum enumeration that indicates the severity level of the descriptive message that was written to the event log.

 `pLogSwitchName`
 [in] A pointer to the name of the tracing switch.

 `pMessage`
 [in] A pointer to the message that was written to the event log.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
