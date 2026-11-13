---
title: "ICorDebugProcess::GetHelperThreadID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-gethelperthreadid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess::GetHelperThreadID Method

Gets the operating system (OS) thread ID of the debugger's internal helper thread.

## Syntax

```cpp
HRESULT GetHelperThreadID (
    [out] DWORD *pThreadID
);
```

## Parameters

 `pThreadID`
 [out] A pointer to the OS thread ID of the debugger's internal helper thread.

## Remarks

During managed and unmanaged debugging, it is the debugger's responsibility to ensure that the thread with the specified ID remains running if it hits a breakpoint placed by the debugger. A debugger may also wish to hide this thread from the user. If no helper thread exists in the process yet, the `GetHelperThreadID` method returns zero in *`pThreadID`.

You cannot cache the thread ID of the helper thread, because it might change over time. You must re-query the thread ID at every stopping event.

The thread ID of the debugger's helper thread will be correct on every unmanaged ICorDebugManagedCallback::CreateThread event, thus allowing a debugger to determine the thread ID of its helper thread and hide it from the user. A thread that is identified as a helper thread during an unmanaged `ICorDebugManagedCallback::CreateThread` event will never run managed user code.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl. CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
