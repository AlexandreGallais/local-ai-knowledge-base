---
title: "ICorDebugDebugEvent::GetThread Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugdebugevent-getthread-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugDebugEvent::GetThread Method

Gets the thread on which the event occurred.

## Syntax

```cpp
HRESULT GetThread(
        [out]ICorDebugThread **ppThread
);
```

## Parameters

ppThread
 [out] A pointer to the address of an ICorDebugThread object that represents the thread on which the event occurred.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDebugEvent Interface
