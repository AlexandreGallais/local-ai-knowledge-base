---
title: "ICorDebugThread4::GetCurrentCustomDebuggerNotification Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread4-getcurrentcustomdebuggernotification-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
