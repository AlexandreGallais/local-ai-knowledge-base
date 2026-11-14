---
title: "ICorDebug::CanLaunchOrAttach Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-canlaunchorattach-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebug::CanLaunchOrAttach Method

Returns an HRESULT that indicates whether launching a new process or attaching to the specified existing process is possible within the context of the current machine and runtime configuration.

## Syntax

```cpp
HRESULT CanLaunchOrAttach (
    [in] DWORD      dwProcessId,
    [in] BOOL       win32DebuggingEnabled
);
```

## Parameters

 `dwProcessId`
 [in] The ID of an existing process.

 `win32DebuggingEnabled`
 [in] Pass in `true` if you plan to launch with Win32 debugging enabled, or to attach with Win32 debugging enabled; otherwise, pass `false`.

## Return Value

S_OK if the debugging services determine that launching a new process or attaching to the given process is possible, given the information about the current machine and runtime configuration. Possible HRESULT values are:

- S_OK
- CORDBG_E_DEBUGGING_NOT_POSSIBLE
- CORDBG_E_KERNEL_DEBUGGER_PRESENT
- CORDBG_E_KERNEL_DEBUGGER_ENABLED

## Remarks

This method is purely informational. The interface will not stop you from launching or attaching to a process, regardless of the value returned by `CanLaunchOrAttach`.

If you plan to launch with Win32 debugging enabled or attach with Win32 debugging enabled, pass `true` for `win32DebuggingEnabled`. The HRESULT returned by `CanLaunchOrAttach` might differ if you use this option.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
