---
title: "ICorDebugRemote::DebugActiveProcessEx Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugremote-debugactiveprocessex-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRemote::DebugActiveProcessEx Method

Launches a process on a remote machine under the debugger.

## Syntax

```cpp
HRESULT DebugActiveProcessEx (
    [in]  ICorDebugRemoteTarget *   pRemoteTarget,
    [in]  DWORD                     dwProcessId,
    [in]  BOOL                      fWin32Attach,
    [out] ICorDebugProcess **       ppProcess
);
```

## Parameters

 `pRemoteTarget`
 [in] Pointer to an ICorDebugRemoteTarget Interface. This parameter is used to determine the machine on which the process is running.

 `id`
 [in] The ID of the process to which the debugger is to be attached.

 `win32Attach`
 [in] `true` if the debugger should behave as the Win32 debugger for the process and dispatch the unmanaged callbacks; otherwise, `false`.

 `ppProcess`
 [out] A pointer to the address of an "ICorDebugProcess" object that represents the process to which the debugger has been attached.

## Return Value

S_OK
Successfully attached to the process on the remote machine.

E_FAIL (or other E_ return codes)
Unable to attach to the process on the remote machine.

## Remarks

Mixed-mode debugging is not supported in Silverlight.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 4.5, 4, 3.5 SP1

## See also

- ICorDebugRemote Interface
- ICorDebug Interface
