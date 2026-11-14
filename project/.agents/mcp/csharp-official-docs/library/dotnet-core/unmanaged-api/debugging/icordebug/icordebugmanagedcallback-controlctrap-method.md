---
title: "ICorDebugManagedCallback::ControlCTrap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-controlctrap-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::ControlCTrap Method

Notifies the debugger that a CTRL+C is trapped in the process that is being debugged.

## Syntax

```cpp
HRESULT ControlCTrap (
    [in] ICorDebugProcess *pProcess
);
```

## Parameters

 `pProcess`
 [in] A pointer to an ICorDebugProcess object that represents the process in which the CTRL+C is trapped.

## Return Value

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The debugger will handle the CTRL+C trap.|
|S_FALSE|The debugger will not handle the CTRL+C trap.|

## Remarks

All application domains within the process are stopped for this callback.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
