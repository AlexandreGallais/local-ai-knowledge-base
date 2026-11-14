---
title: "CorDebugBlockingObject Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugblockingobject-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugBlockingObject Structure

Defines an object that is blocking a thread and the specific reason that the thread is blocked.

## Syntax

```cpp
Typedef struct CorDebugBlockingObject
{
ICorDebugValue pBlockingObject;
DWORD dwTimeout;
CorDebugBlockingReason blockingReason;
}  CorDebugBlockingObject;
```

## Members

|Member|Description|
|------------|-----------------|
|`pBlockingObject`|The object on which the thread is blocking. This object is valid only for the duration of the current synchronized state. If two threads are blocking on the same object within the same synchronized state, you may expect the ICorDebugValue::GetAddress method to return the same value. However, the interfaces may or may not be pointer equivalent.|
|`dwTimeout`|The number of milliseconds before the blocking operation will time out, or the value INFINITE, which indicates that it will not time out. The time-out value specifies the total length of time for the blocking operation, not the time that is still remaining.|
|`blockingReason`|The reason that the thread is blocked on this object.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
