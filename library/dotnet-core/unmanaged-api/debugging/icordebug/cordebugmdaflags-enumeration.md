---
title: "CorDebugMDAFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugmdaflags-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugMDAFlags Enumeration

Specifies the status of the thread on which the managed debugging assistant (MDA) is fired.

## Syntax

```cpp
typedef enum CorDebugMDAFlags {
    MDA_FLAG_SLIP = 0x2
} CorDebugMDAFlags;
```

## Members

|Member|Description|
|------------|-----------------|
|`MDA_FLAG_SLIP`|The thread on which the MDA was fired has slipped since the MDA was fired.|

## Remarks

 When the call stack no longer describes where the MDA was originally raised, the thread is considered to have *slipped*. This is an unusual circumstance brought about by the thread's execution of an invalid operation upon exiting.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
