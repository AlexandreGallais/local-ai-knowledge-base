---
title: "ICorDebugUnmanagedCallback::DebugEvent Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugunmanagedcallback-debugevent-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugUnmanagedCallback::DebugEvent Method

Notifies the debugger that a native event has been fired.

## Syntax

```cpp
HRESULT DebugEvent (
    [in] LPDEBUG_EVENT  pDebugEvent,
    [in] BOOL           fOutOfBand
);
```

## Parameters

 `pDebugEvent`
 [in] A pointer to the native event.

 `fOutOfBand`
 [in] `true`, if interaction with the managed process state is impossible after an unmanaged event occurs, until the debugger calls ICorDebugController::Continue; otherwise, `false`.

## Remarks

If the thread being debugged is a Win32 thread, do not use any members of the Win32 debugging interface. You can call `ICorDebugController::Continue` only on a Win32 thread and only when continuing past an out-of-band event.

The `DebugEvent` callback does not follow the standard rules for callbacks. When you call `DebugEvent`, the process will be in the raw, OS-debug stopped state. The process will not be synchronized. It will automatically enter the synchronized state when necessary to satisfy requests for information about managed code, which may result in other nested `DebugEvent` callbacks.

Call ICorDebugProcess::ClearCurrentException on the process to ignore an exception event before continuing the process. Calling this method sends DBG_CONTINUE instead of DBG_EXCEPTION_NOT_HANDLED on the continue request, and automatically clears out-of-band breakpoints and single-step exceptions. Out-of-band events can come at any time, even when the application being debugged appears stopped and when an outstanding in-band event already exists.

The debugger should immediately continue past an out-of-band breakpoint event. The debugger should be using the ICorDebugProcess2::SetUnmanagedBreakpoint and ICorDebugProcess2::ClearUnmanagedBreakpoint methods to add and remove breakpoints. These methods will skip over any out-of-band breakpoints automatically. Thus, the only out-of-band breakpoints that get dispatched should be raw breakpoints that are already in the instruction stream, such as a call to the Win32 `DebugBreak` function. Do not try to use `ICorDebugProcess::ClearCurrentException`, ICorDebugProcess::GetThreadContext, ICorDebugProcess::SetThreadContext, or any other member of the debugging API.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugUnmanagedCallback Interface
