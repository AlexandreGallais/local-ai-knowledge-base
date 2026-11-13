---
title: "CorDebugBlockingReason Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugblockingreason-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugBlockingReason Enumeration

Specifies the reasons why a thread may become blocked on a given object.

## Syntax

```cpp
Typedef enum CorDebugBlockingReason
{
   BLOCKING_NONE = 0
   BLOCKING_MONITOR_CRITICAL_SECTION = 1
   BLOCKING_MONITOR_EVENT = 2
}  CorDebugBlockingReason;
```

## Members

| Member          | Description        |
|-----------------|--------------------|
| `BLOCKING_NONE` | Internal use only. |
|`BLOCKING_MONITOR_CRITICAL_SECTION`|A thread is trying to acquire the critical section that is associated with the monitor lock on an object. Typically, this occurs when you call one of the `System.Threading.Monitor.Enter*` or `System.Threading.Monitor.TryEnter*` methods.|
|`BLOCKING_MONITOR_EVENT`|A thread is waiting on the event that is associated with a monitor lock for an object. Typically, this occurs when you call one of the `System.Threading.Monitor``Wait` methods.|

## Remarks

 When the `BLOCKING_MONITOR_CRITICAL_SECTION` or `BLOCKING_MONITOR_EVENT` member is used in a CorDebugBlockingObject structure, the `pBlockingObject` member of the structure points to an "ICorDebugValue" interface that represents the object that is being entered. It is also guaranteed to implement the ICorDebugHeapValue3 interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
