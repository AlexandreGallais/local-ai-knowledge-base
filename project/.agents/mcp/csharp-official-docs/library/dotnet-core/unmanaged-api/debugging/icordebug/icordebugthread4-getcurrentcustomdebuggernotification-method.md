---
title: "ICorDebugThread4::GetCurrentCustomDebuggerNotification Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread4-getcurrentcustomdebuggernotification-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread4::GetCurrentCustomDebuggerNotification Method

Gets the current ICorDebugManagedCallback3::CustomNotification object on the current thread.

## Syntax

```cpp
HRESULT GetCurrentCustomDebuggerNotification(
    [out] ICorDebugValue **ppNotificationObject
    );
```

## Parameters

`ppNotificationObject`\
[out] A pointer to the current `ICorDebugManagedCallback3::CustomNotification` object on the current thread.

## Remarks

The value of `ppNotificationObject` is null if the method is not called from within a `ICorDebugManagedCallback3::CustomNotification` callback, or if no current notification object exists.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugThread4 Interface
