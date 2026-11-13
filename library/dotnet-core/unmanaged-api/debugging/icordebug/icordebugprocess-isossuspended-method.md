---
title: "ICorDebugProcess::IsOSSuspended Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-isossuspended-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess::IsOSSuspended Method

Gets a value that indicates whether the specified thread has been suspended as a result of the debugger stopping this process.

## Syntax

```cpp
HRESULT IsOSSuspended(
    [in]  DWORD threadID,
    [out] BOOL  *pbSuspended);
```

## Parameters

 `threadID`
 [in] The ID of thread in question.

 `pbSuspended`
 [out] A pointer to a Boolean value that is `true` if the specified thread has been suspended; otherwise *`pbSuspended` is `false`.

## Remarks

When the specified thread has been suspended as a result of the debugger stopping this process, the specified thread's Win32 suspend count is incremented by one. The debugger user interface (UI) may want to take this information into account if it displays the operating system (OS) suspend count of the thread to the user.

The `IsOSSuspended` method makes sense only in the context of unmanaged debugging. During managed debugging, threads are cooperatively suspended rather than OS-suspended.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
