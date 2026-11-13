---
title: "ICorDebugProcess::EnableLogMessages Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-enablelogmessages-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess::EnableLogMessages Method

Enables and disables the transmission of log messages to the debugger.

## Syntax

```cpp
HRESULT EnableLogMessages([in]BOOL fOnOff);
```

## Parameters

 `fOnOff`
 [in] `true` enables the transmission of log messages; `false` disables the transmission.

## Remarks

This method is valid only after the ICorDebugManagedCallback::CreateProcess callback occurs.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
