---
title: "ICorDebugProcess::GetThreadContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-getthreadcontext-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess::GetThreadContext Method

Gets the context for the given thread in this process.

## Syntax

```cpp
HRESULT GetThreadContext(
    [in] DWORD threadID,
    [in] ULONG32 contextSize,
    [in, out, length_is(contextSize), size_is(contextSize)]
    BYTE context[]);
```

## Parameters

 `threadID`
 [in] The ID of the thread for which to retrieve the context.

 `contextSize`
 [in] The size of the `context` array.

 `context`
 [in, out] An array of bytes that describe the thread's context.

The context specifies the architecture of the processor on which the thread is executing.

## Remarks

The debugger should call this method rather than the Win32 `GetThreadContext` method, because the thread may actually be in a "hijacked" state, in which its context has been temporarily changed. This method should be used only when a thread is in native code. Use ICorDebugRegisterSet for threads in managed code.

The data returned is a context structure for the current platform. Just as with the Win32 `GetThreadContext` method, the caller should initialize the `context` parameter before calling this method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
