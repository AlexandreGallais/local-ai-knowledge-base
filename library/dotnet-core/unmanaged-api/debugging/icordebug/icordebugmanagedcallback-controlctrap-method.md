---
title: "ICorDebugManagedCallback::ControlCTrap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-controlctrap-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
