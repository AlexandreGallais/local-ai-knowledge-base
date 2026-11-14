---
title: "ICorDebugController::Continue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-continue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugController::Continue Method

Resumes execution of managed threads after a call to Stop Method.

## Syntax

```cpp
HRESULT Continue (
    [in] BOOL fIsOutOfBand
);
```

## Parameters

`fIsOutOfBand`
[in] Set to `true` if continuing from an out-of-band event; otherwise, set to `false`.

## Remarks

`Continue` continues the process after a call to the `ICorDebugController::Stop` method.

When doing mixed-mode debugging, do not call `Continue` on the Win32 event thread unless you are continuing from an out-of-band event.

An *in-band event* is either a managed event or a normal unmanaged event during which the debugger supports interaction with the managed state of the process. In this case, the debugger receives the ICorDebugUnmanagedCallback::DebugEvent callback with its `fOutOfBand` parameter set to `false`.

An *out-of-band event* is an unmanaged event during which interaction with the managed state of the process is impossible while the process is stopped due to the event. In this case, the debugger receives the `ICorDebugUnmanagedCallback::DebugEvent` callback with its `fOutOfBand` parameter set to `true`.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 1.0
