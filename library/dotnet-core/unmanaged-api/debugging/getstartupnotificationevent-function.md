---
title: "GetStartupNotificationEvent Function"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/getstartupnotificationevent-function.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# GetStartupNotificationEvent function

Creates or opens an event handle that will be signaled upon by any common language runtime (CLR) that is loading in the specified target process. This API is Windows only.

## Syntax

```cpp
HRESULT GetStartupNotificationEvent (
    [in]  DWORD     debuggeePID,
    [out]  HANDLE*  phStartupEvent
);
```

## Parameters

 `debuggeePID`\
 [in] Process identifier of the target process from which to receive CLR startup notifications.

 `phStartupEvent`\
 [out] A pointer to a handle that will be signaled by a CLR on startup.

## Return value

 `S_OK`\
 Successfully obtained the handle to the startup notification event.

 `E_INVALIDARG`\
 `phStartupEvent` is null or `debuggeePID` does not refer to a process that is currently running.

 `E_FAIL` (or other `E_` return codes)\
 Unable to obtain the handle to the startup notification event.

## Remarks

 On the Windows operating system, `debuggeePID` maps to an OS process identifier.

 The event is signaled before any managed code is executed by the CLR that signaled the event.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll

 **.NET Versions:** Available since .NET Core 2.1
