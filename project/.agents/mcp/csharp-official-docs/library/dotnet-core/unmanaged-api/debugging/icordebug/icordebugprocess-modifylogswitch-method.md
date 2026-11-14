---
title: "ICorDebugProcess::ModifyLogSwitch Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-modifylogswitch-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess::ModifyLogSwitch Method

Sets the severity level of the specified log switch.

## Syntax

```cpp
HRESULT ModifyLogSwitch(
    [in] WCHAR *pLogSwitchName,
    [in] LONG  lLevel);
```

## Parameters

 `pLogSwitchName`
 [in] A pointer to a string that specifies the name of the log switch.

 `lLevel`
 [in] The severity level to be set for the specified log switch.

## Remarks

This method is valid only after the ICorDebugManagedCallback::CreateProcess callback has occurred.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
