---
title: "ICorDebugHeapValue3::GetThreadOwningMonitorLock Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugheapvalue3-getthreadowningmonitorlock-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHeapValue3::GetThreadOwningMonitorLock Method

Returns the managed thread that owns the monitor lock on this object.

## Syntax

```cpp
HRESULT GetThreadOwningMonitorLock (
    [out] ICorDebugThread   **ppThread,
    [out] DWORD              *pAcquisitionCount
);
```

## Parameters

 `ppThread`
 [out] The managed thread that owns the monitor lock on this object.

 `pAcquisitionCount`
 [out] The number of times this thread would have to release the lock before it returns to being unowned.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The method completed successfully.|
|S_FALSE|No managed thread owns the monitor lock on this object.|

## Remarks

If a managed thread owns the monitor lock on this object:

- The method returns S_OK.

- The thread object is valid until the thread exits.

If no managed thread owns the monitor lock on this object, `ppThread` and `pAcquisitionCount` are unchanged, and the method returns S_FALSE.

If `ppThread` or `pAcquisitionCount` is not a valid pointer, the result is undefined.

If an error occurs such that it cannot be determined which, if any, thread owns the monitor lock on this object, the method returns an HRESULT that indicates failure.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
