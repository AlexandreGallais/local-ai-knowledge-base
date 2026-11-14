---
title: "ICorDebugHeapValue3::GetMonitorEventWaitList Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugheapvalue3-getmonitoreventwaitlist-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHeapValue3::GetMonitorEventWaitList Method

Provides an ordered list of threads that are queued on the event that is associated with a monitor lock.

## Syntax

```cpp
HRESULT GetMonitorEventWaitList (
    [out] ICorDebugThreadEnum **ppThreadEnum
);
```

## Parameters

 `ppThreadEnum`
 [out] The ICorDebugThreadEnum enumerator that provides the ordered list of threads.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The list is not empty.|
|S_FALSE|The list is empty.|

## Remarks

The first thread in the list is the first thread that is released by the next call to `System.Threading.Monitor.Pulse(System.Object)`. The next thread in the list is released on the following call, and so on.

If the list is not empty, this method returns S_OK. If the list is empty, the method returns S_FALSE; in this case, the enumeration is still valid, although it is empty.

In either case, the enumeration interface is usable only for the duration of the current synchronized state. However, the thread's interfaces dispensed from it are valid until the thread exits.

If `ppThreadEnum` is not a valid pointer, the result is undefined.

If an error occurs such that it cannot be determined which, if any, threads are waiting for the monitor, the method returns an HRESULT that indicates failure.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
