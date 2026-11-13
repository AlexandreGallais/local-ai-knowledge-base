---
title: "ICorDebugManagedCallback::LogSwitch Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-logswitch-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::LogSwitch Method

Notifies the debugger that a common language runtime (CLR) managed thread has called a method in the `System.Diagnostics.Switch` class to create, modify, or delete a debugging/tracing switch.

## Syntax

```cpp
HRESULT LogSwitch (
    [in] ICorDebugAppDomain  *pAppDomain,
    [in] ICorDebugThread     *pThread,
    [in] LONG                 lLevel,
    [in] ULONG                ulReason,
    [in] WCHAR               *pLogSwitchName,
    [in] WCHAR               *pParentName);
```

## Parameters

 `PAppDomain`\
 [in] A pointer to an ICorDebugAppDomain object that represents the application domain containing the managed thread that created, modified, or deleted a debugging/tracing switch.

 `pThread`\
 [in] A pointer to an ICorDebugThread object that represents the managed thread.

 `lLevel`\
 [in] A value that indicates the severity level of the descriptive message that was written to the event log.

 `ulReason`\
 [in] A value of the LogSwitchCallReason enumeration that indicates the operation performed on the debugging/tracing switch.

 `pLogSwitchName`\
 [in] A pointer to the name of the debugging/tracing switch.

 `pParentName`\
 [in] A pointer to the name of the parent of the debugging/tracing switch.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
