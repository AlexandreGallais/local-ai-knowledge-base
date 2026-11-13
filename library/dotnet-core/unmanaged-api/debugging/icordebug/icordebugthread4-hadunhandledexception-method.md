---
title: "ICorDebugThread4::HadUnhandledException Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread4-hadunhandledexception-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread4::HadUnhandledException Method

Indicates whether the thread has ever had an unhandled exception.

## Syntax

```cpp
HRESULT GetBlockingObjects (
    [out] ICorDebugBlockingObjectEnum **ppBlockingObjectEnum
    );
```

## Parameters

 `ppBlockingObjectEnum`
 [out] A pointer to the address of an ordered enumeration of CorDebugBlockingObject structures.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The thread has had an unhandled exception since its creation.|
|S_FALSE|The thread has never had an unhandled exception.|

## Remarks

This method indicates whether the thread has ever had an unhandled exception. By the time the unhandled exception callback is triggered or native JIT-attach is initiated, this method is guaranteed to return S_OK. There is no guarantee that the ICorDebugThread.GetCurrentException method will return the unhandled exception; however, it will if the process has not yet been continued after getting the unhandled exception callback or upon native JIT-attach. Furthermore, it is possible (although unlikely) to have more than one thread with an unhandled exception at the time native JIT-attach is triggered. In such a case there is no way to determine which exception triggered the JIT-attach.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugThread4 Interface
